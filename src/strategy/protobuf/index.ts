import { Stream } from 'stream';
import { ProtobufTransform } from '../../utils/protobuf-transform';
import { TransformStrategy } from '../../types';
import { ProtobufOptions } from './types/';
import { load, Root, Type } from 'protobufjs';
import { createGunzip, createGzip } from 'zlib';
import { SerializerStrategy } from '../serializer';

export class ProtobufStrategy implements SerializerStrategy {
	private options!: ProtobufOptions;
	private context!: Promise<Type>;

	constructor(options: ProtobufOptions) {
		this.options = options;
		this.context = this.load(options);
	}

	private async load(options: ProtobufOptions): Promise<Type> {
		const type: Type | undefined = await new Promise(async (resolve) => {
			await load(options.proto, (err: Error | null, root?: Root) => {
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
	async serialize(content: Stream): Promise<Stream> {
		const context = await this.context;
		const transform = new ProtobufTransform({
			strategy: TransformStrategy.SERIALIZE,
			type: context,
		});
		content.pipe(transform);

		if (this.options.gzip) {
			const gz = createGzip();
			transform.pipe(gz);
			return gz;
		}

		return transform;
	}

	async deserialize(content: Stream): Promise<Stream> {
		const context = await this.context;
		const transform = new ProtobufTransform({
			strategy: TransformStrategy.DESERIALIZE,
			type: context,
		});

		if (!this.options.gzip) {
			return content.pipe(transform);
		}
		const unzip = createGunzip();
		content.pipe(unzip);
		unzip.pipe(transform);

		return transform;
	}
}
