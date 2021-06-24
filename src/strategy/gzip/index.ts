import { ChainSerializerStrategy, Serialized } from '../serializer';
import { ZlibOptions, createGzip, createGunzip } from 'zlib';
import { Stream } from 'stream';
import { isStream, pipeStream } from '../../utils';

const HEADER_LIMIT = 2;
const GZIP_HEADER_1 = 0x1f;
const GZIP_HEADER_2 = 0x8b;

export class GzipStrategy
	implements ChainSerializerStrategy<Stream | Serialized>
{
	constructor(private options?: ZlibOptions) {}

	async serialize(content: Serialized | Stream): Promise<Stream> {
		return pipeStream(content, createGzip(this.options));
	}

	async deserialize(
		content: Serialized | Stream,
	): Promise<Stream | Serialized> {
		return this.isGzip(content)
			? pipeStream(content, createGunzip(this.options))
			: content;
	}

	private isGzip(content: Serialized | Stream) {
		if (isStream(content)) {
			return true;
		}
		const buff = Buffer.from(content.slice(0, HEADER_LIMIT) as ArrayBuffer);

		return buff[0] === GZIP_HEADER_1 && buff[1] === GZIP_HEADER_2;
	}
}
