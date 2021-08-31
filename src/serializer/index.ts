/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stream } from 'stream';
import {
	ChainSerializerStrategy,
	Serialized,
	SerializerStrategy,
} from '../strategy/serializer';
import {
	preChainOp,
	concatStream,
	enqueueTaskFactory,
	resolver,
} from '../utils';
import { isStrategy } from '../utils/is-strategy';
import { SerializerOptions } from './types';

const defaultOptions: SerializerOptions = {};

function getMethodFactory<A extends ChainSerializerStrategy>(
	as: A[],
	m: 'serialize' | 'deserialize',
) {
	return (i: number) => {
		const a = as[i];
		return a[m].bind(a);
	};
}

const checkZero = (i: number) => i >= 0;

function lastChainFactory(lastChain: number) {
	return (i: number) => i <= lastChain;
}

function serializeFactory<
	MainStrategy extends SerializerStrategy<any, Serialized>,
	In,
	Out extends Serialized | Stream,
>(
	strategy: MainStrategy,
	chain: ChainSerializerStrategy[],
	lastChain: number,
): <T extends In>(data: T) => Out | Promise<Out> {
	const serialize = preChainOp(
		getMethodFactory(chain, 'serialize'),
		0,
		lastChainFactory(lastChain),
		1,
	);
	const firstSerialize = strategy.serialize.bind(strategy);

	return <T extends In>(data: T): Out | Promise<Out> =>
		resolver(resolver(firstSerialize(data), serialize), concatStream) as
			| Out
			| Promise<Out>;
}

export class Serializer<
	MainStrategy extends SerializerStrategy<any, Serialized>,
	In extends MainStrategy extends SerializerStrategy<infer R, any>
		? R
		: never = MainStrategy extends SerializerStrategy<infer R, any> ? R : never,
	FirstOut extends MainStrategy extends SerializerStrategy<any, infer R>
		? R
		: never = MainStrategy extends SerializerStrategy<any, infer R> ? R : never,
	Chain extends ChainSerializerStrategy[] = ChainSerializerStrategy[],
	Out extends Chain extends [
		...ChainSerializerStrategy[],
		SerializerStrategy<any, infer R>,
	]
		? R extends Stream
			? Serialized
			: R
		: FirstOut = Chain extends [
		...ChainSerializerStrategy[],
		SerializerStrategy<any, infer R>,
	]
		? R extends Stream
			? Serialized
			: R
		: FirstOut,
> {
	constructor(strategy: MainStrategy, ...chain: Chain);
	constructor(
		strategy: MainStrategy,
		options: SerializerOptions,
		...chain: Chain
	);
	constructor(
		strategy: MainStrategy,
		options: ChainSerializerStrategy | SerializerOptions | undefined,
		...chain: Chain
	) {
		if (!options || !isStrategy(options)) {
			options = options || defaultOptions;
		} else {
			chain = [options, ...chain] as Chain;
			options = defaultOptions;
		}
		const lastChain = chain.length - 1;
		const queue = Symbol('serializerQueue');
		const deserialize = preChainOp(
			getMethodFactory(chain, 'deserialize'),
			lastChain,
			checkZero,
			-1,
		);
		const lastDeserialize = strategy.deserialize.bind(strategy);
		this.deserialize = (data) => resolver(deserialize(data), lastDeserialize);
		const serialize = serializeFactory<MainStrategy, In, Out>(
			strategy,
			chain,
			lastChain,
		);
		this.serialize = enqueueTaskFactory(options, queue, serialize);
	}

	readonly serialize: <T extends In>(data: T) => Out | Promise<Out>;

	readonly deserialize: <T extends In>(data: Out) => T | Promise<T>;
}
