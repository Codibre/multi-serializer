import { SerializerStrategy } from '../serializer';
import { gzip, gunzip, ZlibOptions, InputType } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

export class GzipStrategy implements SerializerStrategy<InputType, Buffer> {
	constructor(private options?: ZlibOptions) {}

	async serialize(content: InputType): Promise<Buffer> {
		return gzipAsync(content, this.options);
	}

	async deserialize(content: Buffer): Promise<InputType> {
		return gunzipAsync(content, this.options);
	}
}
