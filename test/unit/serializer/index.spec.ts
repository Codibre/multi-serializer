import { Serializer } from '../../../src/serializer/index';
import { GzipStrategy } from '../../../src/strategy/gzip';
import { JsonStrategy } from '../../../src/strategy/json';
import { ProtobufStrategy } from '../../../src/strategy/protobuf';
describe('index.ts', () => {
	afterEach(() => {
		// delete require.cache[require.resolve('../../../src/serializer/index')];
	});

	it('should start proto', async () => {
		const proto = new ProtobufStrategy({
			attribute: 'a.b.Foo',
			proto: './foo.proto',
			gzip: true,
		});
		const serializer = new Serializer(proto, new GzipStrategy());
		const req = {
			bar: 'abc',
		};
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(read).toMatchObject(req);
	});

	it('should start json', async () => {
		const proto = new JsonStrategy({
			type: {
				title: 'Foo',
				type: 'object',
				properties: {
					bar: {
						type: 'string',
					},
				},
			},
			gzip: true,
		});
		const serializer = new Serializer(proto, new GzipStrategy());
		const req = {
			bar: 'abc',
		};
		const write = await serializer.serialize(req);
		const read = await serializer.deserialize(write);

		expect(read).toMatchObject(req);
	});
});
