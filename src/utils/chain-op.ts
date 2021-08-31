import { Stream } from 'stream';
import { isPromise, resolver } from './is-promise';
import { concatStream } from '.';
import { Serialized } from '..';

export function chainOp(
	op: (
		i: number,
		result: Stream | Serialized,
	) => Serialized | Stream | Promise<Serialized | Stream>,
	init: number,
	keepGoing: (i: number, r: Serialized | Stream) => boolean,
	inc: number,
) {
	return (x: Serialized | Stream): Serialized | Promise<Serialized> => {
		let i = init;
		const chain = (
			info: Serialized | Stream,
		): Serialized | Promise<Serialized> => {
			let result: Serialized | Stream | Promise<Serialized | Stream> = info;
			while (keepGoing(i, result)) {
				result = op(i, result);
				i += inc;
				if (isPromise(result)) {
					return result.then(chain);
				}
			}

			return concatStream(result);
		};
		return chain(x);
	};
}

export function preChainOp(
	op: (
		i: number,
	) => (
		result: Stream | Serialized,
	) => Serialized | Stream | Promise<Serialized | Stream>,
	init: number,
	keepGoing: (i: number) => boolean,
	inc: number,
): (result: Stream | Serialized) => Serialized | Promise<Serialized> {
	if (!keepGoing(init)) {
		return concatStream;
	}
	let result: (
		result: Stream | Serialized,
	) => Serialized | Stream | Promise<Serialized | Stream> = op(init);
	init += inc;
	for (let i = init; keepGoing(i); i += inc) {
		const prevOp = result;
		const newOp = op(i);
		result = (r) => resolver(prevOp(r), newOp);
	}

	return (r) => resolver(result(r), concatStream);
}
