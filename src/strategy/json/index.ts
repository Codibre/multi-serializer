import { Stream } from 'stream';
import { TransformStrategy } from '../../types';
import { SerializerStrategy } from '../serializer';
import { createGunzip, createGzip } from 'zlib';
import { JsonOptions } from './types';
import { FastJsonTransform } from '../../utils/fastjson-transform';

export class JsonStrategy implements SerializerStrategy {
	private options!: JsonOptions;

	constructor(options: JsonOptions) {
		this.options = options;
	}

	async serialize(content: Stream): Promise<Stream> {
		const transform = new FastJsonTransform({
			...this.options,
			strategy: TransformStrategy.SERIALIZE,
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
		const transform = new FastJsonTransform({
			...this.options,
			strategy: TransformStrategy.DESERIALIZE,
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
