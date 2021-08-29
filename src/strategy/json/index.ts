import { Serialized, SerializerStrategy } from '../serializer';
import { JsonOptions } from './types';
import * as stringify from 'fast-json-stringify';
import { SerializerMode, promiseFactory } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class JsonStrategy<A = any>
	implements SerializerStrategy<A, Serialized>
{
	static readonly instance = new JsonStrategy();
	static readonly syncInstance = new JsonStrategy({
		mode: SerializerMode.SYNC,
	});
	private exec: CallableFunction;

	constructor(options?: JsonOptions) {
		const exec = options?.schema
			? stringify(options.schema, options.options)
			: JSON.stringify;
		this.exec =
			!options?.mode || options.mode === SerializerMode.ASYNC
				? promiseFactory(exec)
				: exec;
	}

	serialize<T extends A>(content: T): Serialized | Promise<Serialized> {
		return this.exec(content);
	}

	deserialize<T extends A>(
		content: Serialized,
		encode: BufferEncoding = 'utf-8',
	): T | Promise<T> {
		return JSON.parse(
			typeof content === 'string'
				? content
				: Buffer.from(content).toString(encode),
		);
	}
}
