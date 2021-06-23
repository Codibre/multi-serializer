import {
	Base64Strategy,
	Serializer,
	GzipStrategy,
	JsonStrategy,
	ProtobufStrategy,
} from '../../../src';
import { gzip } from 'zlib';
import { promisify } from 'util';
import { interval } from '@codibre/fluent-iterable';

const gzipAsync = promisify(gzip);

describe('index.ts', () => {
	afterEach(() => {
		// delete require.cache[require.resolve('../../../src/serializer/index')];
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

		expect(read).toMatchObject(req);
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

		expect(read).toMatchObject(req);
	});

	it('should work with json + base64', async () => {
		const req = {
			bar: 'abc',
		};
		const serializer = new Serializer(new JsonStrategy(), new Base64Strategy());

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(read).toMatchObject(req);
	});

	it('should work with big json', async () => {
		const target = new Serializer(new JsonStrategy(), new GzipStrategy());
		const data = interval(0, 300000)
			.map(() => ({ bar: 'bar', foo: 'foo' }))
			.toArray();

		const zip = await target.serialize(data);
		const result = await target.deserialize(zip);

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

		expect(err).not.toBeUndefined();
	});
});
