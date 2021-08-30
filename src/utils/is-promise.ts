/* eslint-disable @typescript-eslint/no-explicit-any */
export function isPromise<T>(t: Promise<T> | T): t is Promise<T> {
	return !!(t && typeof (t as Promise<T>).then === 'function');
}

export function resolver<T, R>(
	t: Promise<T> | T,
	cb: (t: T) => R | Promise<R>,
) {
	return isPromise(t) ? t.then(cb) : cb(t);
}

export function promiseFactory<Args extends any[], T>(
	cb: (...args: Args) => T,
) {
	return (...args: Args) =>
		new Promise(async (resolve, reject) => {
			try {
				resolve(cb(...args));
			} catch (err) {
				reject(err);
			}
		});
}
