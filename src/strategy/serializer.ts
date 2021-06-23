import { Stream } from 'stream';

export interface StrategyStream extends Stream {
	onEnd?<T>(encode?: BufferEncoding): T;
}

export type Serialized = Uint8Array | string;

export interface SerializerStrategy<I, O extends Serialized> {
	serialize(content: I): Promise<O> | O;
	deserialize(content: O): Promise<I> | I;
}
