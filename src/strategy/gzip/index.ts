import { ChainSerializerStrategy, Serialized } from '../serializer';
import { ZlibOptions, createGzip, createGunzip } from 'zlib';
import { Stream } from 'stream';
import { pipeStream } from '../../utils';

export class GzipStrategy implements ChainSerializerStrategy<Stream> {
	constructor(private options?: ZlibOptions) {}

	async serialize(content: Serialized | Stream): Promise<Stream> {
		return pipeStream(content, createGzip(this.options));
	}

	async deserialize(content: Serialized | Stream): Promise<Stream> {
		return pipeStream(content, createGunzip(this.options));
	}
}
