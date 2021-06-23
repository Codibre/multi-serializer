/* istanbul ignore file */

import { Stream } from 'stream';

export interface StrategyStream extends Stream {
	onEnd?<T>(encode?: BufferEncoding): T;
}

export type Serialized = string | ArrayBuffer | Uint8Array;

export interface SerializerStrategy<I, O extends Serialized | Stream> {
	serialize(content: I): Promise<O> | O;
	deserialize(content: O): Promise<I> | I;
}

export interface ChainSerializerStrategy
	extends SerializerStrategy<Serialized | Stream, Serialized | Stream> {}
