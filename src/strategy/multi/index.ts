import { ChainSerializerStrategy, Serialized } from '../serializer';
import { Stream } from 'stream';
import { chainOp, concatStream, isPromise, resolver } from '../../utils';
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

	serialize(
		content: Serialized | Stream,
	): Serialized | Stream | Promise<Serialized | Stream> {
		const { serializers } = this.options;
		const { length } = serializers;
		const serialize = chainOp(
			(i, r) => {
				const strategy = this.strategies[serializers[i]];
				if (!strategy) {
					throw new TypeError(`Invalid strategy index ${serializers[i]}`);
				}
				return strategy.serialize(r);
			},
			0,
			(i) => i < length,
			1,
		);

		return serialize(content);
	}

	deserialize(
		content: Serialized | Stream,
	): Serialized | Stream | Promise<Stream | Serialized> {
		let must = false;
		const { strategies } = this;
		const { length } = strategies;
		function findOne(value: Serialized) {
			let i = 0;
			while (i < length && !(must = strategies[i].mustDeserialize(value))) {
				i++;
			}
			return must ? strategies[i].deserialize(value) : value;
		}

		function findAll(
			value: Serialized | Stream,
		): Serialized | Stream | Promise<Serialized | Stream> {
			do {
				const result = resolver(concatStream(value), findOne);
				if (isPromise(result)) {
					return result.then(findAll);
				}
				value = result;
			} while (must);

			return value;
		}

		return findAll(content);
	}
}
