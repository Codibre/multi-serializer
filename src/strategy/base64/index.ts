import { ChainSerializerStrategy, Serialized } from '../serializer';
import { Stream } from 'stream';
import { concatStream, isStream } from '../../utils';

export class Base64Strategy implements ChainSerializerStrategy<string> {
	async serialize(content: Serialized | Stream): Promise<string> {
		if (isStream(content)) {
			content = await concatStream(content);
		}

		return Buffer.from(content as ArrayBuffer).toString('base64');
	}

	async deserialize(content: string): Promise<Serialized> {
		return Buffer.from(content, 'base64');
	}
}
