import { Schema, Options } from 'fast-json-stringify';
import { StrategyOptions } from '..';

export interface JsonOptions extends StrategyOptions {
	schema?: Schema;
	options?: Options;
}
