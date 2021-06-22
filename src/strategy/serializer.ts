import { Stream } from 'stream';
import { StrategyOptions } from '../types';

export interface StrategyStream extends Stream {
	onEnd?<T>(encode?: BufferEncoding): T;
}

export interface SerializerStrategy {
	serialize(
		content: Stream,
		options?: StrategyOptions,
	): Promise<Stream> | Stream;
	deserialize(
		content: Stream,
		options?: StrategyOptions,
	): Promise<StrategyStream> | StrategyStream;
}
