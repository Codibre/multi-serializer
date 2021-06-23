import { ChainSerializerStrategy, Serialized } from '../serializer';
import { gzip, gunzip, ZlibOptions } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

export class GzipStrategy implements ChainSerializerStrategy {
	constructor(private options?: ZlibOptions) {}

	async serialize(content: Serialized): Promise<Serialized> {
		return gzipAsync(content, this.options);
	}

	async deserialize(content: Serialized): Promise<Serialized> {
		return gunzipAsync(content, this.options);
	}
}
