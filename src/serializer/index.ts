/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stream } from 'stream';
import {
	ChainSerializerStrategy,
	Serialized,
	SerializerStrategy,
} from '../strategy/serializer';
import { chainOp, concatStream, enqueueTask, resolver } from '../utils';
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

	serialize<T extends In>(data: T): Out | Promise<Out> {
		return enqueueTask(
			this.options,
			this.queue,
			this.serializeFactory<T>(data),
		);
	}

	private serializeFactory<T extends In>(data: T) {
		return (): Out | Promise<Out> => {
			const serialize = chainOp(
				(i, r) => this.chain[i].serialize(r),
				0,
				(i) => i <= this.lastChain,
				1,
			);
			const serialized = resolver(this.strategy.serialize(data), serialize);

			return resolver(serialized, concatStream) as Out | Promise<Out>;
		};
	}

	deserialize<T extends In>(data: Out): T | Promise<T> {
		const deserialize = chainOp(
			(i, r) => this.chain[i].deserialize(r),
			this.lastChain,
			(i) => i >= 0,
			-1,
		);
		return resolver(
			deserialize(data),
			this.strategy.deserialize.bind(this.strategy),
		);
	}
}
