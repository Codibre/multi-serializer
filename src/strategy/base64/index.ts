import { ChainSerializerStrategy, Serialized } from '../serializer';
import { Stream } from 'stream';
import { concatStream, resolver } from '../../utils';

function toBase64(content: Serialized | Stream): string {
	return Buffer.from(content as ArrayBuffer).toString('base64');
}

export class Base64Strategy implements ChainSerializerStrategy<string> {
	serialize(content: Serialized | Stream): string | Promise<string> {
		const result = concatStream(content);

		return resolver(result, toBase64);
	}

	deserialize(content: string): Serialized | Promise<Serialized> {
		return Buffer.from(content, 'base64');
	}
}
