import { Type } from 'protobufjs';
import { TransformOptions } from 'stream';

export interface ProtobufTransformOptions extends TransformOptions {
	type: Type;
}

export class ProtobufTransform {
	private type: Type;
	constructor(opts: ProtobufTransformOptions) {
		this.type = opts.type;
	}

	serialize<T>(value: T): Uint8Array {
		return this.type.encode(value).finish() || value;
	}

	deserialize<T>(chunk: Uint8Array): T {
		return this.type.decode(chunk) as unknown as T;
	}
}
