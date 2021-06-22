import { Readable } from 'stream';
import { SerializerStrategy } from '../strategy/serializer';

export class Serializer {
	async serialize<T>(
		data: T,
		strategy: SerializerStrategy,
	): Promise<Buffer | string> {
		const base: Readable = new Readable({
			objectMode: true,
		});

		let isBuffer = false;
		let isFirst = true;

		const stream = await strategy.serialize(base);

		const result: Promise<string | Buffer> = new Promise((resolve) => {
			const res: Array<string> | Array<Buffer | string> = [];
			stream.on('data', (chunk) => {
				if (isFirst) {
					isFirst = false;
					isBuffer = Buffer.isBuffer(chunk);
				}
				res.push(chunk);
			});
			stream.on('end', () => {
				if (isBuffer) {
					resolve(Buffer.concat(res as Buffer[]));
				}
				resolve(res[0]); // because if is string is only one;
			});
		});
		base.push(data);
		base.push(null);

		return result;
	}

	async deserialize<T>(data: Buffer | string, strategy: SerializerStrategy) {
		const base: Readable = new Readable({
			objectMode: true,
		});

		const stream = await strategy.deserialize(base);
		base.push(data);
		base.push(null);
		return new Promise<T>((resolve) => {
			let res = {};
			const listener = stream.onEnd
				? () => undefined
				: (chunk: T) => {
						res = { res, ...chunk };
				  };
			stream.on('data', listener);
			stream.once('end', () => stream.off('data', listener));
			stream.once('end', () => {
				const a = stream.onEnd ? stream.onEnd<T>() : (res as T);
				resolve(a);
			});
		});
	}
}
