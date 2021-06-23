import { Stream } from 'stream';
import { Serialized } from '../strategy/serializer';
import { isStream } from './is-stream';

export function concatStream(result: Stream | Serialized) {
	return isStream(result)
		? new Promise<Serialized>((resolve, reject) => {
				const res: Array<Serialized> = [];
				result.on('data', (chunk) => {
					res.push(chunk);
				});
				result.once('error', reject);
				result.once('end', () => {
					try {
						resolve(Buffer.concat(res as Buffer[]));
					} catch (err) {
						reject(err);
					}
				});
		  })
		: result;
}
