import { Stream, Writable } from 'stream';
import { Serialized } from '../strategy/serializer';
import { isStream } from './is-stream';

export function pipeStream(content: Serialized | Stream, gzip: Writable) {
	if (isStream(content)) {
		content.on('error', (err) => gzip.emit('error', err));
		return content.pipe(gzip);
	}
	gzip.write(content);
	gzip.end();

	return gzip;
}
