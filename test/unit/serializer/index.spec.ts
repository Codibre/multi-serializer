import { Serializer } from '../../../src/serializer/index';
import { JsonStrategy } from '../../../src/strategy/json';
import { ProtobufStrategy } from '../../../src/strategy/protobuf';
describe('index.ts', () => {
	afterEach(() => {
		// delete require.cache[require.resolve('../../../src/serializer/index')];
	});

	it('should start proto', async () => {
		const serializer = new Serializer();
		const proto = new ProtobufStrategy({
			attribute: 'a.b.Foo',
			proto: './foo.proto',
			gzip: true,
		});
		const req = {
			bar: 'abc',
		};
		const write = await serializer.serialize(req, proto);
		const read = await serializer.deserialize(write, proto);

		expect(read).toMatchObject(req);
	});

	it.only('should start json', async () => {
		const serializer = new Serializer();
		const proto = new JsonStrategy({
			schema: {
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
		const req = {
			bar: 'abc',
		};
		const write = await serializer.serialize(req, proto);
		const read = await serializer.deserialize(write, proto);

		expect(read).toMatchObject(req);
	});
});
