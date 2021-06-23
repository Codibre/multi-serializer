/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ChainSerializerStrategy,
	Serialized,
	SerializerStrategy,
} from '../strategy/serializer';
import { concatStream } from '../utils';

export class Serializer<A> {
	private readonly chain: ChainSerializerStrategy[];
	private readonly lastChain: number;
	constructor(
		private strategy: SerializerStrategy<A, Serialized>,
		...chain: ChainSerializerStrategy[]
	) {
		this.chain = chain;
		this.lastChain = chain.length - 1;
	}

	async serialize<T extends A>(data: T): Promise<Serialized> {
		let result: any = await this.strategy.serialize(data);

		if (this.lastChain >= 0) {
			for (let i = 0; i <= this.lastChain; i++) {
				result = await this.chain[i].serialize(result);
			}
		}
		return concatStream(result);
	}

	async deserialize<T extends A>(data: Serialized): Promise<T> {
		let result: any = data;
		for (let i = this.lastChain; i >= 0; i--) {
			result = await this.chain[i].deserialize(result);
		}
		result = await concatStream(result);
		return this.strategy.deserialize(result) as T;
	}
}
