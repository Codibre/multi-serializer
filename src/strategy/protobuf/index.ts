import { ProtobufOptions } from './types/';
import { load, Root, Type } from 'protobufjs';
import { SerializerStrategy } from '../serializer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ProtobufStrategy<A = any>
	implements SerializerStrategy<A, Uint8Array>
{
	private type: Promise<Type>;

	constructor(private options: ProtobufOptions) {
		this.type = this.load(options);
	}

	private async load(options: ProtobufOptions): Promise<Type> {
		const type: Type | undefined = await new Promise(async (resolve) => {
			load(options.proto, (err: Error | null, root?: Root) => {
				if (err) {
					throw err;
				}
				resolve(root?.lookupType(options.attribute));
			});
		});

		if (!type) {
			throw new Error('invalid type');
		}
		return type;
	}

	async serialize<T extends A>(content: T): Promise<Uint8Array> {
		return (await this.type).encode(content).finish() || content;
	}

	async deserialize<T>(content: Uint8Array): Promise<T> {
		return (await this.type).decode(content) as unknown as T;
	}
}
