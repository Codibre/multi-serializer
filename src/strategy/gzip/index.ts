import { SerializerMode } from './../../utils/serializer-mode';
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
	mode?: SerializerMode;
}

export class GzipStrategy
	implements ChainSerializerStrategy<Stream | Serialized>, OptionalDeserializer
{
	constructor(options?: GzipOptions) {
		const deserialize =
			options?.mode === SerializerMode.SYNC
				? gunzipSync
				: (r: Serialized) => pipeStream(r, createGunzip(options));
		this.deserialize = (content) =>
			resolver(concatStream(content), (r) =>
				this.mustDeserialize(r) ? deserialize(r) : r,
			);
		const gzipAsync = (content: Serialized | Stream) =>
			pipeStream(content, createGzip(options));
		this.serialize =
			options?.mode === SerializerMode.SYNC
				? (content) =>
						isStream(content) ? gzipAsync(content) : gzipSync(content)
				: gzipAsync;
	}

	mustDeserialize(content: Serialized): boolean {
		const buff = Buffer.from(content.slice(0, HEADER_LIMIT) as ArrayBuffer);
		return buff[0] === GZIP_HEADER_1 && buff[1] === GZIP_HEADER_2;
	}

	readonly serialize: (
		content: Serialized | Stream,
	) => Serialized | Stream | Promise<Serialized | Stream>;

	readonly deserialize: (
		content: Serialized | Stream,
	) => Stream | Serialized | Promise<Stream | Serialized>;
}
