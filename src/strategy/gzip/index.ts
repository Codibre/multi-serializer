import { ChainSerializerStrategy, Serialized } from '../serializer';
import { ZlibOptions, createGzip, createGunzip } from 'zlib';
import { Stream } from 'stream';
import { isStream } from '../../utils';

export class GzipStrategy implements ChainSerializerStrategy<Stream> {
	constructor(private options?: ZlibOptions) {}

	async serialize(content: Serialized | Stream): Promise<Stream> {
		const gzip = createGzip(this.options);
		if (isStream(content)) {
			return content.pipe(gzip);
		}
		gzip.write(content);
		gzip.end();
		return gzip;
	}

	async deserialize(content: Serialized | Stream): Promise<Stream> {
		const gzip = createGunzip(this.options);
		if (isStream(content)) {
			return content.pipe(gzip);
		}
		gzip.write(content);
		gzip.end();
		return gzip;
	}
}
