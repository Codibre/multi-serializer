import { Transform, TransformOptions } from 'stream';
import * as stringify from 'fast-json-stringify';
import { TransformStrategy } from '../strategy';

export interface JsonTransformOptions extends TransformOptions {
	strategy: TransformStrategy;
	type?: stringify.Schema;
	options?: stringify.Options;
}

export class FastJsonTransform extends Transform {
	private strategy: TransformStrategy;
	private exec: CallableFunction;
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

	private deserialize<T>(chunk: Buffer, encode: BufferEncoding): T {
		return JSON.parse(chunk.toString(encode)) as T;
	}

	_transform<T>(chunk: T, encode: string, call: CallableFunction) {
		const data = (this[this.strategy] as CallableFunction)(chunk);
		call(null, data);
	}
}
