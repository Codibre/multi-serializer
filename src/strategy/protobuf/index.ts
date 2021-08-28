import { ProtobufOptions } from './types/';
import { load, Root, Type } from 'protobufjs';
import { SerializerStrategy } from '../serializer';
import { resolver } from '../../utils';

function isProtoBufOptions<Other>(
	x: ProtobufOptions | Other,
): x is ProtobufOptions {
	const { proto } = x as ProtobufOptions;
	return typeof proto === 'string' || Array.isArray(proto);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ProtobufStrategy<A = any>
	implements SerializerStrategy<A, Uint8Array>
{
	private type: Promise<Type> | Type;

	constructor(options: ProtobufOptions | Type) {
		this.type = isProtoBufOptions(options) ? this.load(options) : options;
	}

	private async load(options: ProtobufOptions): Promise<Type> {
		const type: Type | undefined = await new Promise(async (resolve, reject) =>
			load(options.proto, (err: Error | null, root?: Root) =>
				err ? reject(err) : resolve(root?.lookupType(options.attribute)),
			),
		);

		if (!type) {
			throw new Error('invalid type');
		}
		return type;
	}

	serialize<T extends A>(content: T): Uint8Array | Promise<Uint8Array> {
		return resolver(this.type, (x) => x.encode(content).finish() || content);
	}

	deserialize<T extends A>(content: Uint8Array): T | Promise<T> {
		return resolver(this.type, (x) => x.decode(content) as unknown as T);
	}
}
