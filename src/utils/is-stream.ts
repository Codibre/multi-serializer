import { Stream } from 'stream';

export function isStream(stream: Stream | unknown): stream is Stream {
	return (
		stream !== null &&
		typeof stream === 'object' &&
		typeof (stream as Stream).pipe === 'function'
	);
}
