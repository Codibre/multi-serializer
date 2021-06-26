/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stream } from 'stream';
import {
	ChainSerializerStrategy,
	Serialized,
	SerializerStrategy,
} from '../strategy/serializer';
import { concatStream, enqueueTask } from '../utils';
import { isStrategy } from '../utils/is-strategy';
import { SerializerOptions } from './types';

const defaultOptions: SerializerOptions = {};

export class Serializer<
	MainStrategy extends SerializerStrategy<any, Serialized>,
	In extends MainStrategy extends SerializerStrategy<infer R, any> ? R : never,
	FirstOut extends MainStrategy extends SerializerStrategy<any, infer R>
		? R
		: never,
	Chain extends ChainSerializerStrategy[],
	Out extends Chain extends [
		...ChainSerializerStrategy[],
		SerializerStrategy<any, infer R>,
	]
		? R extends Stream
			? Serialized
			: R
		: FirstOut,
> {
	private queue = Symbol('serializerQueue');
	private readonly options: SerializerOptions;
	private readonly chain: Chain;
	private readonly lastChain: number;

	constructor(strategy: MainStrategy, ...chain: Chain);
	constructor(
		strategy: MainStrategy,
		options: SerializerOptions,
		...chain: Chain
	);
	constructor(
		private strategy: MainStrategy,
		options: ChainSerializerStrategy | SerializerOptions | undefined,
		...chain: Chain
	) {
		if (!options || !isStrategy(options)) {
			this.options = options || defaultOptions;
			this.chain = chain;
		} else {
			this.options = defaultOptions;
			this.chain = [options, ...chain] as Chain;
		}
		this.lastChain = this.chain.length - 1;
	}

	async serialize<T extends In>(data: T): Promise<Out> {
		return enqueueTask(
			this.options,
			this.queue,
			this.serializeFactory<T>(data),
		);
	}

	private serializeFactory<T extends In>(data: T) {
		return async () => {
			let result: any = await this.strategy.serialize(data);

			if (this.lastChain >= 0) {
				for (let i = 0; i <= this.lastChain; i++) {
					result = await this.chain[i].serialize(result);
				}
			}
			return concatStream(result) as Out;
		};
	}

	async deserialize<T extends In>(data: Out): Promise<T> {
		let result: any = data;
		for (let i = this.lastChain; i >= 0; i--) {
			result = await this.chain[i].deserialize(result);
		}
		result = await concatStream(result);
		return this.strategy.deserialize(result) as T;
	}
}
