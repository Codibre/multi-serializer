import { Type } from 'protobufjs';
import { Transform, TransformOptions } from 'stream';
import { TransformStrategy } from '../strategy';

export interface ProtobufTransformOptions extends TransformOptions {
	type: Type;
	strategy: TransformStrategy;
}

export class ProtobufTransform extends Transform {
	private type: Type;
	private strategy: TransformStrategy;
	constructor(opts: ProtobufTransformOptions) {
		super({ ...opts, objectMode: true });
		this.type = opts.type;
		this.strategy = opts.strategy;
	}

	private serialize<T>(chunk: T): Uint8Array {
		return this.type.encode(chunk).finish() || chunk;
	}

	private deserialize<T>(chunk: Uint8Array): T {
		return (this.type.decode(chunk) as unknown) as T;
	}

	_transform<T>(chunk: T, encode: string, call: CallableFunction) {
		try {
			const data = (this[this.strategy] as CallableFunction)(chunk);
			call(null, data);
		} catch (err) {
			call(err, null);
		}
	}
}
