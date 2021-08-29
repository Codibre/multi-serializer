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

function deserialize(content: string): Serialized | Promise<Serialized> {
	return Buffer.from(content, 'base64');
}

const promiseSerialize = promiseFactory(serialize);
const promiseDeserialize = promiseFactory(deserialize);

export interface Base64Options {
	mode: SerializerMode;
}

export class Base64Strategy implements ChainSerializerStrategy<string> {
	static readonly instance = new Base64Strategy();
	static readonly syncInstance = new Base64Strategy({
		mode: SerializerMode.SYNC,
	});

	constructor(private options?: Base64Options) {}

	serialize(content: Serialized | Stream): string | Promise<string> {
		return this.options?.mode === SerializerMode.SYNC
			? serialize(content)
			: (promiseSerialize(content) as Promise<string>);
	}

	deserialize(content: string): Serialized | Promise<Serialized> {
		return this.options?.mode === SerializerMode.SYNC
			? deserialize(content)
			: (promiseDeserialize(content) as Promise<Serialized>);
	}
}
