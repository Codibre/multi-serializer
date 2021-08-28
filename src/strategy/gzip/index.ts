import { ChainSerializerStrategy, Serialized } from '../serializer';
import {
	ZlibOptions,
	createGzip,
	createGunzip,
	gzipSync,
	gunzipSync,
} from 'zlib';
import { Stream } from 'stream';
import { concatStream, isStream, pipeStream, resolver } from '../../utils';
import { OptionalDeserializer } from '../multi/types';

const HEADER_LIMIT = 2;
const GZIP_HEADER_1 = 0x1f;
const GZIP_HEADER_2 = 0x8b;

export interface GzipOptions extends ZlibOptions {
	sync?: boolean;
}

export class GzipStrategy
	implements ChainSerializerStrategy<Stream | Serialized>, OptionalDeserializer
{
	constructor(private options?: GzipOptions) {}

	mustDeserialize(content: Serialized): boolean {
		const buff = Buffer.from(content.slice(0, HEADER_LIMIT) as ArrayBuffer);
		return buff[0] === GZIP_HEADER_1 && buff[1] === GZIP_HEADER_2;
	}

	serialize(
		content: Serialized | Stream,
	): Serialized | Stream | Promise<Serialized | Stream> {
		return this.options?.sync && !isStream(content)
			? gzipSync(content)
			: pipeStream(content, createGzip(this.options));
	}

	deserialize(
		content: Serialized | Stream,
	): Stream | Serialized | Promise<Stream | Serialized> {
		return resolver(concatStream(content), (r) =>
			this.options?.sync
				? gunzipSync(r)
				: this.mustDeserialize(r)
				? pipeStream(r, createGunzip(this.options))
				: r,
		);
	}
}
