import { Serialized, SerializerStrategy } from '../serializer';
import { JsonOptions } from './types';
import * as stringify from 'fast-json-stringify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class JsonStrategy implements SerializerStrategy<any, Serialized> {
	private exec: CallableFunction;

	constructor(options?: JsonOptions) {
		this.exec = options?.type
			? stringify(options.type, options?.options)
			: JSON.stringify;
	}

	async serialize<T>(content: T): Promise<Serialized> {
		return this.exec(content);
	}

	async deserialize<T>(
		content: Serialized,
		encode: BufferEncoding = 'utf-8',
	): Promise<T> {
		return JSON.parse(
			typeof content === 'string'
				? content
				: Buffer.from(content).toString(encode),
		);
	}
}
