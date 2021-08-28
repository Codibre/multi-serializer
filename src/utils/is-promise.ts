export function isPromise<T>(t: Promise<T> | T): t is Promise<T> {
	return !!(t && typeof (t as Promise<T>).then === 'function');
}

export function resolver<T, R>(
	t: Promise<T> | T,
	cb: (t: T) => R | Promise<R>,
) {
	return isPromise(t) ? t.then(cb) : cb(t);
}
