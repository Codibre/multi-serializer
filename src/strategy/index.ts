import { Stream } from 'stream';

export interface StrategyOptions {
	interface: string | string[];
	context: string;
}
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
