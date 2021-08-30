const queuePool = new Map<symbol, [number, Promise<unknown>[]]>();

export interface EnqueueOption {
	enqueue?: number;
}

const resolved = Promise.resolve();
export function enqueueTask<T>(
	options: EnqueueOption | undefined,
	queueName: symbol,
	cb: () => T | Promise<T>,
): T | Promise<T> {
	if (!options?.enqueue) {
		return cb();
	}
	let queues = queuePool.get(queueName);
	if (!queues) {
		const pool: Promise<unknown>[] = [];
		for (let i = 0; i < options.enqueue; i++) {
			pool.push(resolved);
		}
		queuePool.set(queueName, (queues = [-1, pool]));
	}
	const idx = (queues[0] + 1) % queues[1].length;
	queues[0] = idx;
	const newNode = queues[1][idx].then(async () => {
		const result = await cb();
		if (newNode === queues![1][idx]) {
			queues![1][idx] = resolved;
		}
		if (queues![1].every((x) => x === resolved)) {
			queuePool.delete(queueName);
		}
		return result;
	});
	queues[1][idx] = newNode;
	return newNode;
}
