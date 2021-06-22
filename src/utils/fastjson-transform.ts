import { Transform, TransformOptions } from 'stream';
import * as stringify from 'fast-json-stringify';
import { TransformStrategy } from '../types';

export interface JsonTransformOptions extends TransformOptions {
	strategy: TransformStrategy;
	type?: stringify.Schema;
	options?: stringify.Options;
}

export class FastJsonTransform extends Transform {
	private strategy: TransformStrategy;
	private exec: CallableFunction;
	private buff: number[] = [];

	constructor(opts: JsonTransformOptions) {
		super({ ...opts, objectMode: true });
		this.strategy = opts.strategy;
		this.exec = opts?.type
			? stringify(opts.type, opts?.options)
			: JSON.stringify;
	}

	private serialize<T>(chunk: T): Uint8Array {
		return this.exec(chunk);
	}

	private deserialize(chunk: Buffer) {
		if (chunk) {
			this.buff.push(...chunk);
		}
		return chunk;
	}

	async onEnd<T>(encode: BufferEncoding = 'utf-8') {
		return JSON.parse(Buffer.from(this.buff).toString(encode)) as T;
	}

	_transform<T>(chunk: T, encode: string, call: CallableFunction) {
		const data = (this[this.strategy] as CallableFunction)(chunk);
		call(null, data);
	}
}
