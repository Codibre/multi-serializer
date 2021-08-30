import {
	Base64Strategy,
	Serializer,
	GzipStrategy,
	JsonStrategy,
	ProtobufStrategy,
	SerializerMode,
} from '../../../src';
import { gzip } from 'zlib';
import { promisify } from 'util';
import { constant, interval } from '@codibre/fluent-iterable';

const wait = promisify(setTimeout);
const gzipAsync = promisify(gzip);

describe('index.ts', () => {
	let protoSerialize: jest.SpyInstance;
	let protoDeserialize: jest.SpyInstance;
	let jsonSerialize: jest.SpyInstance;
	let jsonDeserialize: jest.SpyInstance;
	let gzipSerialize: jest.SpyInstance;
	let gzipDeserialize: jest.SpyInstance;
	let b64Serialize: jest.SpyInstance;
	let b64Deserialize: jest.SpyInstance;

	beforeEach(() => {
		protoSerialize = jest.spyOn(ProtobufStrategy.prototype, 'serialize');
		protoDeserialize = jest.spyOn(ProtobufStrategy.prototype, 'deserialize');
		jsonSerialize = jest.spyOn(JsonStrategy.prototype, 'serialize');
		jsonDeserialize = jest.spyOn(JsonStrategy.prototype, 'deserialize');
		gzipSerialize = jest.spyOn(GzipStrategy.prototype, 'serialize');
		gzipDeserialize = jest.spyOn(GzipStrategy.prototype, 'deserialize');
		b64Serialize = jest.spyOn(Base64Strategy.prototype, 'serialize');
		b64Deserialize = jest.spyOn(Base64Strategy.prototype, 'deserialize');
	});

	it('should work with proto', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new ProtobufStrategy<typeof req>({
				attribute: 'a.b.Foo',
				proto: './foo.proto',
			}),
		);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(protoSerialize).toHaveBeenCalledTimes(1);
		expect(protoDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with proto + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new ProtobufStrategy({
				attribute: 'a.b.Foo',
				proto: './foo.proto',
			}),
			new GzipStrategy({
				level: 9,
			}),
		);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(protoSerialize).toHaveBeenCalledTimes(1);
		expect(protoDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with fast json', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new JsonStrategy<typeof req>({
				schema: {
					title: 'Foo',
					type: 'object',
					properties: {
						bar: {
							type: 'string',
						},
					},
				},
			}),
		);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with fast json + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new JsonStrategy<typeof req>({
				schema: {
					title: 'Foo',
					type: 'object',
					properties: {
						bar: {
							type: 'string',
						},
					},
				},
			}),
			new GzipStrategy(),
		);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with fast json + gzip sync', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new JsonStrategy<typeof req>({
				schema: {
					title: 'Foo',
					type: 'object',
					properties: {
						bar: {
							type: 'string',
						},
					},
				},
			}),
			new GzipStrategy({
				mode: SerializerMode.SYNC,
			}),
		);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json', async () => {
		const req = {
			bar: 'abc',
		};
		const proto = new JsonStrategy<typeof req>();
		const serializer = new Serializer(proto);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with Sync json', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(JsonStrategy.syncInstance);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new JsonStrategy<typeof req>({}),
			new GzipStrategy(),
		);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json serializing and json + gzip deserializing (as no gzip buffers are ignored by GzipStrategy)', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(new JsonStrategy<typeof req>({}));
		const deserializer = new Serializer(
			new JsonStrategy<typeof req>({}),
			new GzipStrategy(),
		);

		const write = await serializer.serialize(req);
		const read = await deserializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(0);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json serializing and json + gzip sync deserializing (as no gzip buffers are ignored by GzipStrategy)', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(new JsonStrategy<typeof req>({}));
		const deserializer = new Serializer(
			new JsonStrategy<typeof req>({}),
			new GzipStrategy({
				mode: SerializerMode.SYNC,
			}),
		);

		const write = await serializer.serialize(req);
		const read = await deserializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(0);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should throw an error with json + gzip serializing and json deserializing (as gzip output is no valid json string)', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new JsonStrategy<typeof req>({}),
			new GzipStrategy(),
		);
		const deserializer = new Serializer(new JsonStrategy<typeof req>({}));
		let err: any;

		const write = await serializer.serialize(req);
		try {
			await deserializer.deserialize(write);
		} catch (error) {
			err = error;
		}

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(err).not.toBeUndefined();
	});

	it('should work with json + gzip + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new JsonStrategy(),
			new GzipStrategy(),
			new GzipStrategy({
				level: 9,
			}),
		);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(2);
		expect(gzipDeserialize).toHaveBeenCalledTimes(2);
		expect(read).toMatchObject(req);
	});

	it('should work with json + gzip + base64', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			new JsonStrategy(),
			new GzipStrategy(),
			new Base64Strategy(),
		);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(b64Serialize).toHaveBeenCalledTimes(1);
		expect(b64Deserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json + base64', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(new JsonStrategy(), new Base64Strategy());

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(b64Serialize).toHaveBeenCalledTimes(1);
		expect(b64Deserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json + Sync base64', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(
			JsonStrategy.instance,
			Base64Strategy.syncInstance,
		);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(b64Serialize).toHaveBeenCalledTimes(1);
		expect(b64Deserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with big json with gzip', async () => {
		const target = new Serializer(new JsonStrategy(), new GzipStrategy());
		const data = interval(0, 300000)
			.map(() => ({ bar: 'bar', foo: 'foo' }))
			.toArray();

		const zip = await target.serialize(data);
		const result = await target.deserialize(zip);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(result).toEqual(data);
	});

	it('should return undefined when gzip decompressing throws an error', async () => {
		const target = new Serializer(new JsonStrategy(), new GzipStrategy());
		let err: any;

		try {
			await target.deserialize(Buffer.from('dfklsjflsdlfkjslkjfls'));
		} catch (error) {
			err = error;
		}
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(err).not.toBeUndefined();
	});

	it('should return undefined when JSON.parse throws an error', async () => {
		const target = new Serializer(new JsonStrategy(), new GzipStrategy());
		let err: any;

		try {
			await target.deserialize(await gzipAsync('dfklsjflsdlfkjslkjfls'));
		} catch (error) {
			err = error;
		}

		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(err).not.toBeUndefined();
	});

	it('should serialize enqueued when enqueue is used', async () => {
		const target = new Serializer(new JsonStrategy(), { enqueue: 1 });
		const call1 = jest.fn();
		const call2 = jest.fn();
		jest
			.spyOn(target, 'serializeFactory' as any)
			.mockImplementationOnce(
				() => () => wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(
				() => () => wait(2).then(call2).then(constant('result 2')),
			);

		const result1 = target.serialize('data 1');
		const result2 = await target.serialize('data 2');

		expect(call1).toHaveBeenCalledBefore(call2);
		expect(await result1).toBe('result 1');
		expect(result2).toBe('result 2');
	});

	it('should serialize not enqueued when enqueue is used but the number of requests is lesser or equal than the pool size', async () => {
		const target = new Serializer(new JsonStrategy(), { enqueue: 2 });
		const call1 = jest.fn();
		const call2 = jest.fn();
		jest
			.spyOn(target, 'serializeFactory' as any)
			.mockImplementationOnce(
				() => () => wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(
				() => () => wait(2).then(call2).then(constant('result 2')),
			);

		const result1 = target.serialize('data 1');
		const result2 = await target.serialize('data 2');

		expect(call2).toHaveBeenCalledBefore(call1);
		expect(await result1).toBe('result 1');
		expect(result2).toBe('result 2');
	});

	it('should serialize enqueued when enqueue is used and the number of requests is greater than the pool size', async () => {
		const target = new Serializer(new JsonStrategy(), { enqueue: 2 });
		const call1 = jest.fn();
		const call2 = jest.fn();
		const call3 = jest.fn();
		jest
			.spyOn(target, 'serializeFactory' as any)
			.mockImplementationOnce(
				() => () => wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(
				() => () => wait(4).then(call2).then(constant('result 2')),
			)
			.mockImplementationOnce(
				() => () => wait(2).then(call3).then(constant('result 3')),
			);

		const result1 = target.serialize('data 1');
		const result2 = target.serialize('data 2');
		const result3 = await target.serialize('data 3');

		expect(call2).toHaveBeenCalledBefore(call1);
		expect(call1).toHaveBeenCalledBefore(call3);
		expect(await result1).toBe('result 1');
		expect(await result2).toBe('result 2');
		expect(result3).toBe('result 3');
	});

	it('should serialize not enqueued when enqueue is not used', async () => {
		const target = new Serializer(new JsonStrategy());
		const call1 = jest.fn();
		const call2 = jest.fn();
		const call3 = jest.fn();
		jest
			.spyOn(target, 'serializeFactory' as any)
			.mockImplementationOnce(
				() => () => wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(
				() => () => wait(2).then(call2).then(constant('result 2')),
			)
			.mockImplementationOnce(
				() => () => wait(2).then(call3).then(constant('result 3')),
			);

		const result1 = target.serialize('data 1');
		const result2 = target.serialize('data 2');
		const result3 = await target.serialize('data 3');

		expect(call2).toHaveBeenCalledBefore(call1);
		expect(call3).toHaveBeenCalledBefore(call1);
		expect(await result1).toBe('result 1');
		expect(await result2).toBe('result 2');
		expect(result3).toBe('result 3');
	});
});
