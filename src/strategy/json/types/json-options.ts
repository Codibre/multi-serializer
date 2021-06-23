import { Schema, Options } from 'fast-json-stringify';
import { StrategyOptions } from '../../../types';

export interface JsonOptions extends StrategyOptions {
	type?: Schema;
	options?: Options;
}
