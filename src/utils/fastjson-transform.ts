import { TransformOptions } from 'stream';
import * as stringify from 'fast-json-stringify';

export interface JsonTransformOptions extends TransformOptions {
	type?: stringify.Schema;
	options?: stringify.Options;
}

export class FastJsonTransform {
	private exec: CallableFunction;

	constructor(opts: JsonTransformOptions) {
		this.exec = opts?.type
			? stringify(opts.type, opts?.options)
			: JSON.stringify;
	}

	serialize<T>(chunk: T): string {
		return this.exec(chunk);
	}

	deserialize<T>(
		value: string | Uint8Array,
		encode: BufferEncoding = 'utf-8',
	): T {
		return JSON.parse(
			typeof value === 'string' ? value : Buffer.from(value).toString(encode),
		);
	}
}
