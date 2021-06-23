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
		return this.chainSerialize(data, 0);
	}

	private async chainSerialize<T>(
		content: T,
		index: number,
	): Promise<Serialized> {
		const result = await this.strategies[index].serialize(content);

		return index < this.strategies.length - 1
			? this.chainSerialize(result, index + 1)
			: result;
	}

	async deserialize<T extends A>(data: Serialized): Promise<T> {
		return this.chainDeserialize(data, this.strategies.length - 1);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private async chainDeserialize(content: any, index: number): Promise<any> {
		const result = await this.strategies[index].deserialize(content);

		return index > 0 ? this.chainDeserialize(result, index - 1) : result;
	}
}
