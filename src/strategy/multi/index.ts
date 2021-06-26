import { ChainSerializerStrategy, Serialized } from '../serializer';
import { Stream } from 'stream';
import { concatStream } from '../../utils';
import { MultiStrategyOptions, OptionalDeserializer } from './types';

export class MultiStrategy
	implements ChainSerializerStrategy<Stream | Serialized>
{
	private strategies: (ChainSerializerStrategy & OptionalDeserializer)[];

	constructor(
		private options: MultiStrategyOptions,
		...strategies: (ChainSerializerStrategy & OptionalDeserializer)[]
	) {
		const invalids = strategies.filter(
			(x) => typeof x.mustDeserialize !== 'function',
		);
		if (invalids.length > 0) {
			throw new TypeError(
				`All serializers must be optional deserializers, these one are not: ${invalids
					.map((x) => `"${x.constructor?.name || x}"`)
					.join(', ')}`,
			);
		}
		this.strategies = strategies;
	}

	async serialize(content: Serialized | Stream): Promise<Serialized | Stream> {
		const { serializers } = this.options;
		const { length } = serializers;
		for (let i = 0; i < length; i++) {
			const strategy = this.strategies[serializers[i]];
			if (!strategy) {
				throw new TypeError(`Invalid strategy index ${serializers[i]}`);
			}
			content = await strategy.serialize(content);
		}

		return content;
	}

	async deserialize(
		content: Serialized | Stream,
	): Promise<Stream | Serialized> {
		let must = false;
		const { strategies } = this;
		const { length } = strategies;
		do {
			content = await concatStream(content);
			for (let i = 0; i < length; i++) {
				const strategy = strategies[i];
				must = strategy.mustDeserialize(content);
				if (must) {
					content = await strategy.deserialize(content);
					break;
				}
			}
		} while (must);

		return content;
	}
}
