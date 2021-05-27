import { StrategyOptions } from '../../../types';

export interface ProtobufOptions extends StrategyOptions {
	proto: string | string[];
	attribute: string;
}
