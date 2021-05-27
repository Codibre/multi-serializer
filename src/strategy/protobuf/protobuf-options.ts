import { StrategyOptions } from '..';

export interface ProtobufOptions extends StrategyOptions {
	proto: string | string[];
	attribute: string;
}
