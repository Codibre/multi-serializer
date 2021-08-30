/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stream } from 'stream';
import {
	ChainSerializerStrategy,
	Serialized,
	SerializerStrategy,
} from '../strategy/serializer';
import { chainOp, concatStream, enqueueTaskFactory, resolver } from '../utils';
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
	private readonly chaiSerialize = (i: number, r: Serialized | Stream) =>
		this.chain[i].serialize(r);
	private readonly chaiDeserialize = (i: number, r: Serialized | Stream) =>
		this.chain[i].deserialize(r);
	private readonly checkLastChain = (i: number) => i <= this.lastChain;
	private readonly checkZero = (i: number) => i >= 0;

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
		const deserialize = chainOp(
			this.chaiDeserialize,
			this.lastChain,
			this.checkZero,
			-1,
		);
		const lastDeserialize = this.strategy.deserialize.bind(this.strategy);
		this.deserialize = (data) => resolver(deserialize(data), lastDeserialize);
		const serialize = this.serializeFactory();
		this.serialize = enqueueTaskFactory(this.options, this.queue, serialize);
	}

	readonly serialize: <T extends In>(data: T) => Out | Promise<Out>;

	private serializeFactory<T extends In>() {
		const serialize = chainOp(this.chaiSerialize, 0, this.checkLastChain, 1);
		const firstSerialize = this.strategy.serialize.bind(this.strategy);

		return (data: T): Out | Promise<Out> =>
			resolver(resolver(firstSerialize(data), serialize), concatStream) as
				| Out
				| Promise<Out>;
	}

	readonly deserialize: <T extends In>(data: Out) => T | Promise<T>;
}
