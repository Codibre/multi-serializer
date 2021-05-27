import { Stream } from 'stream';

export enum TransformStrategy {
	SERIALIZE = 'serialize',
	DESERIALIZE = 'deserialize',
}

export interface StrategyOptions {
	gzip: boolean;
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
