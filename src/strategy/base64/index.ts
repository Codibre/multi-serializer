import { SerializerMode } from './../../utils/serializer-mode';
import { ChainSerializerStrategy, Serialized } from '../serializer';
import { Stream } from 'stream';
import { concatStream, promiseFactory, resolver } from '../../utils';

function toBase64(content: Serialized | Stream): string {
	return Buffer.from(content as ArrayBuffer).toString('base64');
}

function serialize(content: Serialized | Stream): string | Promise<string> {
	return resolver(concatStream(content), toBase64);
}

function deserialize(
	content: Serialized | Stream,
): Serialized | Promise<Serialized> {
	return resolver(concatStream(content), (r) =>
		Buffer.from(r instanceof Buffer ? r.toString() : (r as string), 'base64'),
	);
}

const promiseSerialize = promiseFactory(serialize) as (
	content: Serialized | Stream,
) => Promise<string>;
const promiseDeserialize = promiseFactory(deserialize) as (
	content: Serialized | Stream,
) => Promise<Serialized>;

export interface Base64Options {
	mode: SerializerMode;
}

export class Base64Strategy implements ChainSerializerStrategy<string> {
	static readonly instance = new Base64Strategy();
	static readonly syncInstance = new Base64Strategy({
		mode: SerializerMode.SYNC,
	});

	constructor(options?: Base64Options) {
		this.serialize =
			options?.mode === SerializerMode.SYNC ? serialize : promiseSerialize;
		this.deserialize =
			options?.mode === SerializerMode.SYNC ? deserialize : promiseDeserialize;
	}

	readonly serialize: (
		content: Serialized | Stream,
	) => string | Promise<string>;

	readonly deserialize: (
		content: Serialized | Stream,
	) => Serialized | Promise<Serialized>;
}
