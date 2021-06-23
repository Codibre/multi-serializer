/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ChainSerializerStrategy,
	Serialized,
	SerializerStrategy,
} from '../strategy/serializer';

export class Serializer<A> {
	private readonly strategies: SerializerStrategy<any, Serialized>[];
	constructor(
		strategy: SerializerStrategy<A, Serialized>,
		...strategies: ChainSerializerStrategy[]
	) {
		this.strategies = [strategy, ...strategies];
	}

	async serialize<T extends A>(data: T): Promise<Serialized> {
		let result: any = data;
		for (let i = 0; i < this.strategies.length; i++) {
			result = await this.strategies[i].serialize(result);
		}
		return result;
	}

	async deserialize<T extends A>(data: Serialized): Promise<T> {
		let result: any = data;
		for (let i = this.strategies.length - 1; i >= 0; i--) {
			result = await this.strategies[i].deserialize(result);
		}
		return result;
	}
}
