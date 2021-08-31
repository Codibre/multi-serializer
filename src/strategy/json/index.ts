import { Serialized, SerializerStrategy } from '../serializer';
import { JsonOptions } from './types';
import * as stringify from 'fast-json-stringify';
import { SerializerMode, promiseFactory } from '../../utils';

type Serialize<A> = <T extends A>(
	content: T,
) => Serialized | Promise<Serialized>;
type Deserialize<A> = <T extends A>(content: Serialized) => T | Promise<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class JsonStrategy<A = any>
	implements SerializerStrategy<A, Serialized>
{
	static readonly instance = new JsonStrategy();
	static readonly syncInstance = new JsonStrategy({
		mode: SerializerMode.SYNC,
	});

	constructor(options?: JsonOptions) {
		this.serialize = options?.schema
			? stringify(options.schema, options.options)
			: JSON.stringify;
		this.deserialize = JSON.parse as Deserialize<A>;
		if (options?.mode !== SerializerMode.SYNC) {
			this.serialize = promiseFactory(this.serialize) as Serialize<A>;
			this.deserialize = promiseFactory(this.deserialize) as Deserialize<A>;
		}
	}

	readonly serialize: Serialize<A>;

	readonly deserialize: Deserialize<A>;
}
