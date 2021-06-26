import { Serialized } from '../../serializer';

export interface MultiStrategyOptions {
	serializers: number[];
}

export interface OptionalDeserializer {
	mustDeserialize(content: Serialized): boolean;
}
