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
	let fastJsonSerialize: jest.SpyInstance;
	let fastJsonDeserialize: jest.SpyInstance;
	let jsonSerialize: jest.SpyInstance;
	let jsonDeserialize: jest.SpyInstance;
	let syncJsonSerialize: jest.SpyInstance;
	let syncJsonDeserialize: jest.SpyInstance;
	let gzip9Serialize: jest.SpyInstance;
	let gzip9Deserialize: jest.SpyInstance;
	let gzipSerialize: jest.SpyInstance;
	let gzipDeserialize: jest.SpyInstance;
	let gzipSyncSerialize: jest.SpyInstance;
	let gzipSyncDeserialize: jest.SpyInstance;
	let b64Serialize: jest.SpyInstance;
	let b64Deserialize: jest.SpyInstance;
	let b64SyncSerialize: jest.SpyInstance;
	let b64SyncDeserialize: jest.SpyInstance;
	const protoStrategy = new ProtobufStrategy<any>({
		attribute: 'a.b.Foo',
		proto: './foo.proto',
	});
	const fastJsonStrategy = new JsonStrategy<any>({
		schema: {
			title: 'Foo',
			type: 'object',
			properties: {
				bar: {
					type: 'string',
				},
			},
		},
	});
	const jsonStrategy = new JsonStrategy<any>();
	const syncJsonStrategy = new JsonStrategy<any>({ mode: SerializerMode.SYNC });
	const gzip9Strategy = new GzipStrategy({
		level: 9,
	});
	const gzipStrategy = new GzipStrategy();
	const gzipSyncStrategy = new GzipStrategy({
		mode: SerializerMode.SYNC,
	});
	const b64Strategy = new Base64Strategy();
	const b64SyncStrategy = new Base64Strategy({ mode: SerializerMode.SYNC });

	beforeEach(() => {
		protoSerialize = jest.spyOn(protoStrategy, 'serialize');
		protoDeserialize = jest.spyOn(protoStrategy, 'deserialize');
		jsonSerialize = jest.spyOn(jsonStrategy, 'serialize');
		jsonDeserialize = jest.spyOn(jsonStrategy, 'deserialize');
		fastJsonSerialize = jest.spyOn(fastJsonStrategy, 'serialize');
		fastJsonDeserialize = jest.spyOn(fastJsonStrategy, 'deserialize');
		syncJsonSerialize = jest.spyOn(syncJsonStrategy, 'serialize');
		syncJsonDeserialize = jest.spyOn(syncJsonStrategy, 'deserialize');
		gzip9Serialize = jest.spyOn(gzip9Strategy, 'serialize');
		gzip9Deserialize = jest.spyOn(gzip9Strategy, 'deserialize');
		gzipSerialize = jest.spyOn(gzipStrategy, 'serialize');
		gzipDeserialize = jest.spyOn(gzipStrategy, 'deserialize');
		gzipSyncSerialize = jest.spyOn(gzipSyncStrategy, 'serialize');
		gzipSyncDeserialize = jest.spyOn(gzipSyncStrategy, 'deserialize');
		b64SyncSerialize = jest.spyOn(b64SyncStrategy, 'serialize');
		b64SyncDeserialize = jest.spyOn(b64SyncStrategy, 'deserialize');
		b64Serialize = jest.spyOn(b64Strategy, 'serialize');
		b64Deserialize = jest.spyOn(b64Strategy, 'deserialize');
	});

	it('should work with proto', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(protoStrategy);
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
		const serializer = new Serializer(protoStrategy, gzip9Strategy);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(protoSerialize).toHaveBeenCalledTimes(1);
		expect(protoDeserialize).toHaveBeenCalledTimes(1);
		expect(gzip9Serialize).toHaveBeenCalledTimes(1);
		expect(gzip9Deserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with fast json', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(fastJsonStrategy);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(fastJsonSerialize).toHaveBeenCalledTimes(1);
		expect(fastJsonDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with fast json + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(fastJsonStrategy, gzipStrategy);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(fastJsonSerialize).toHaveBeenCalledTimes(1);
		expect(fastJsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with fast json + gzip sync', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(fastJsonStrategy, gzipSyncStrategy);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(fastJsonSerialize).toHaveBeenCalledTimes(1);
		expect(fastJsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSyncSerialize).toHaveBeenCalledTimes(1);
		expect(gzipSyncDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(jsonStrategy);
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
		const serializer = new Serializer(syncJsonStrategy);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(syncJsonSerialize).toHaveBeenCalledTimes(1);
		expect(syncJsonDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(jsonStrategy, gzipStrategy);

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
		const serializer = new Serializer(jsonStrategy);
		const deserializer = new Serializer(jsonStrategy, gzipStrategy);

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
		const serializer = new Serializer(jsonStrategy);
		const deserializer = new Serializer(jsonStrategy, gzipSyncStrategy);

		const write = await serializer.serialize(req);
		const read = await deserializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSyncSerialize).toHaveBeenCalledTimes(0);
		expect(gzipSyncDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should throw an error with json + gzip serializing and json deserializing (as gzip output is no valid json string)', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(jsonStrategy, gzipStrategy);
		const deserializer = new Serializer(jsonStrategy);
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
			jsonStrategy,
			gzipStrategy,
			gzip9Strategy,
		);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(gzipSerialize).toHaveBeenCalledTimes(1);
		expect(gzipDeserialize).toHaveBeenCalledTimes(1);
		expect(gzip9Serialize).toHaveBeenCalledTimes(1);
		expect(gzip9Deserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with json + gzip + base64', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(jsonStrategy, gzipStrategy, b64Strategy);

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
		const serializer = new Serializer(jsonStrategy, b64Strategy);

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
		const serializer = new Serializer(jsonStrategy, b64SyncStrategy);

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(jsonSerialize).toHaveBeenCalledTimes(1);
		expect(jsonDeserialize).toHaveBeenCalledTimes(1);
		expect(b64SyncSerialize).toHaveBeenCalledTimes(1);
		expect(b64SyncDeserialize).toHaveBeenCalledTimes(1);
		expect(read).toMatchObject(req);
	});

	it('should work with big json with gzip', async () => {
		const target = new Serializer(jsonStrategy, gzipStrategy);
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
		const target = new Serializer(jsonStrategy, gzipStrategy);
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
		const target = new Serializer(jsonStrategy, gzipStrategy);
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
		const call1 = jest.fn();
		const call2 = jest.fn();
		const spyTest = jest
			.fn()
			.mockImplementationOnce(() =>
				wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(() =>
				wait(2).then(call2).then(constant('result 2')),
			);

		const target = new Serializer(
			{ serialize: spyTest, deserialize: spyTest },
			{ enqueue: 1 },
		);

		const result1 = target.serialize('data 1');
		const result2 = await target.serialize('data 2');

		expect(call1).toHaveBeenCalledBefore(call2);
		expect(await result1).toBe('result 1');
		expect(result2).toBe('result 2');
	});

	it('should serialize not enqueued when enqueue is used but the number of requests is lesser or equal than the pool size', async () => {
		const call1 = jest.fn();
		const call2 = jest.fn();
		const spyTest = jest
			.fn()
			.mockImplementationOnce(() =>
				wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(() =>
				wait(2).then(call2).then(constant('result 2')),
			);

		const target = new Serializer(
			{ serialize: spyTest, deserialize: spyTest },
			{ enqueue: 2 },
		);

		const result1 = target.serialize('data 1');
		const result2 = await target.serialize('data 2');

		expect(call2).toHaveBeenCalledBefore(call1);
		expect(await result1).toBe('result 1');
		expect(result2).toBe('result 2');
	});

	it('should serialize enqueued when enqueue is used and the number of requests is greater than the pool size', async () => {
		const call1 = jest.fn();
		const call2 = jest.fn();
		const call3 = jest.fn();
		const spyTest = jest
			.fn()
			.mockImplementationOnce(() =>
				wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(() =>
				wait(4).then(call2).then(constant('result 2')),
			)
			.mockImplementationOnce(() =>
				wait(2).then(call3).then(constant('result 3')),
			);

		const target = new Serializer(
			{ serialize: spyTest, deserialize: spyTest },
			{ enqueue: 2 },
		);

		const result1 = target.serialize('data 1');
		const result2 = target.serialize('data 2');
		const result3 = await target.serialize('data 3');

		expect(spyTest).toHaveCallsLike(['data 1'], ['data 2'], ['data 3']);
		expect(call2).toHaveBeenCalledBefore(call1);
		expect(call1).toHaveBeenCalledBefore(call3);
		expect(await result1).toBe('result 1');
		expect(await result2).toBe('result 2');
		expect(result3).toBe('result 3');
	});

	it('should serialize not enqueued when enqueue is not used', async () => {
		const call1 = jest.fn();
		const call2 = jest.fn();
		const call3 = jest.fn();
		const spyTest = jest
			.fn()
			.mockImplementationOnce(() =>
				wait(10).then(call1).then(constant('result 1')),
			)
			.mockImplementationOnce(() =>
				wait(2).then(call2).then(constant('result 2')),
			)
			.mockImplementationOnce(() =>
				wait(2).then(call3).then(constant('result 3')),
			);

		const target = new Serializer({ serialize: spyTest, deserialize: spyTest });

		const result1 = target.serialize('data 1');
		const result2 = target.serialize('data 2');
		const result3 = await target.serialize('data 3');

		expect(spyTest).toHaveCallsLike(['data 1'], ['data 2'], ['data 3']);
		expect(call2).toHaveBeenCalledBefore(call1);
		expect(call3).toHaveBeenCalledBefore(call1);
		expect(await result1).toBe('result 1');
		expect(await result2).toBe('result 2');
		expect(result3).toBe('result 3');
	});
});
