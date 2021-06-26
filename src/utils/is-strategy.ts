/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerializerOptions } from '../serializer/types';
import { SerializerStrategy } from '../strategy/serializer';

export function isStrategy(
	value: SerializerStrategy<any, any> | SerializerOptions,
): value is SerializerStrategy<any, any> {
	return (
		value &&
		typeof (value as SerializerStrategy<any, any>).serialize === 'function'
	);
}
