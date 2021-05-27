import { Readable } from 'stream';
import { SerializerStrategy } from '../strategy';

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
		const resolve = await result;

		return resolve;
	}

	async deserialize<T>(data: Buffer | string, strategy: SerializerStrategy) {
		const base: Readable = new Readable({
			objectMode: true,
		});

		const stream = await strategy.deserialize(base);
		const result: Promise<T> = new Promise((resolve) => {
			let res = {};
			stream.on('data', (chunk: T) => {
				res = { res, ...chunk };
			});
			stream.on('end', () => {
				resolve(res as T);
			});
		});
		base.push(data);
		base.push(null);
		const resolve = await result;

		return resolve;
	}
}
