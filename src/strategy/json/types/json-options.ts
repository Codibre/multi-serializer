/* istanbul ignore file */

import { Schema, Options } from 'fast-json-stringify';
import { SerializerMode } from '../../../utils';

export interface JsonOptions {
	schema?: Schema;
	options?: Options;
	mode?: SerializerMode;
}
