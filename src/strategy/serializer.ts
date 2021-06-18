import { Stream } from 'stream';
import { StrategyOptions } from '../types';

export interface SerializerStrategy {
	serialize(
		content: Stream,
		options?: StrategyOptions,
	): Promise<Stream> | Stream;
	deserialize(
		content: Stream,
		options?: StrategyOptions,
	): Promise<Stream> | Stream;
}
