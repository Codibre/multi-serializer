import { Serializer } from '../../../src/serializer/index';
import { GzipStrategy } from '../../../src/strategy/gzip';
import { JsonStrategy } from '../../../src/strategy/json';
import { ProtobufStrategy } from '../../../src/strategy/protobuf';
describe('index.ts', () => {
	afterEach(() => {
		// delete require.cache[require.resolve('../../../src/serializer/index')];
	});

	it('should work with proto', async () => {
		const req = {
			bar: 'abc',
		};
		const proto = new ProtobufStrategy<typeof req>({
			attribute: 'a.b.Foo',
			proto: './foo.proto',
		});
		const serializer = new Serializer(proto);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(read).toMatchObject(req);
	});

	it('should work with proto + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const proto = new ProtobufStrategy<typeof req>({
			attribute: 'a.b.Foo',
			proto: './foo.proto',
		});
		const serializer = new Serializer(proto, new GzipStrategy());
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(read).toMatchObject(req);
	});

	it('should work with fast json', async () => {
		const req = {
			bar: 'abc',
		};
		const proto = new JsonStrategy<typeof req>({
			type: {
				title: 'Foo',
				type: 'object',
				properties: {
					bar: {
						type: 'string',
					},
				},
			},
		});
		const serializer = new Serializer(proto);
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(read).toMatchObject(req);
	});

	it('should work with fast json + gzip', async () => {
		const req = {
			bar: 'abc',
		};
		const strategy = new JsonStrategy<typeof req>({
			type: {
				title: 'Foo',
				type: 'object',
				properties: {
					bar: {
						type: 'string',
					},
				},
			},
		});
		const serializer = new Serializer(strategy, new GzipStrategy());

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
		const strategy = new JsonStrategy<typeof req>();
		const serializer = new Serializer(strategy, new GzipStrategy());

		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(read).toMatchObject(req);
	});
});
