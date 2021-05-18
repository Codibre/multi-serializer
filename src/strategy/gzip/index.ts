import { Stream } from 'stream';
import { createGzip, createGunzip } from 'zlib';
import { SerializerStrategy } from '..';

export class gzipStrategy implements SerializerStrategy {
	serialize(content: Stream): Stream {
		const gz = createGzip();
		content.pipe(gz);
		return content;
	}
	deserialize(content: Stream): Stream {
		const unzip = createGunzip();
		content.pipe(unzip);
		return content;
	}
}
