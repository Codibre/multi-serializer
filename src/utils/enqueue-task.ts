const queuePool = new Map<symbol, [number, Promise<unknown>[]]>();

export interface EnqueueOption {
	enqueue?: number;
}
const resolved = Promise.resolve();

export function enqueueTask<R, T>(
	options: EnqueueOption | undefined,
	queueName: symbol,
	cb: (data: R) => T | Promise<T>,
): (data: R) => T | Promise<T> {
	if (!options?.enqueue) {
		return cb;
	}
	const { enqueue } = options;
	let queues = queuePool.get(queueName)!;
	if (!queues) {
		const pool: Promise<unknown>[] = [];
		for (let i = 0; i < enqueue; i++) {
			pool.push(resolved);
		}
		queuePool.set(queueName, (queues = [-1, pool]));
	}

	return (data) => {
		const idx = (queues[0] + 1) % queues[1].length;
		queues[0] = idx;
		const newNode = queues[1][idx].then(async () => {
			const result = await cb(data);
			if (newNode === queues[1][idx]) {
				queues[1][idx] = resolved;
			}
			if (queues[1].every((x) => x === resolved)) {
				queues[0] = -1;
				queues[1] = [resolved];
			}
			return result;
		});
		queues[1][idx] = newNode;

		return newNode;
	};
}
