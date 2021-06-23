/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stream } from 'stream';
import {
	ChainSerializerStrategy,
	Serialized,
	SerializerStrategy,
} from '../strategy/serializer';
import { concatStream } from '../utils';

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
	private readonly chain: Chain;
	private readonly lastChain: number;
	constructor(private strategy: MainStrategy, ...chain: Chain) {
		this.chain = chain;
		this.lastChain = chain.length - 1;
	}

	async serialize<T extends In>(data: T): Promise<Out> {
		let result: any = await this.strategy.serialize(data);

		if (this.lastChain >= 0) {
			for (let i = 0; i <= this.lastChain; i++) {
				result = await this.chain[i].serialize(result);
			}
		}
		return concatStream(result) as Out;
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
