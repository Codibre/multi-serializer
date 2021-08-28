import { Stream } from 'stream';
import { isPromise } from './is-promise';
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
	return chain;
}
