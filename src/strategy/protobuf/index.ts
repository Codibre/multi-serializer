import { Stream, Transform } from 'stream';
import { SerializerStrategy, StrategyOptions } from '..';
import { load, Root, Type } from 'protobufjs';

export class ProtobufStrategy implements SerializerStrategy {
	private loadOptions(options?: StrategyOptions) {
		if (!options?.interface) {
			throw new Error('No Proto description in interface');
		}

		return options;
	}

	private async load(options: StrategyOptions): Promise<Type> {
		let type: Type | undefined;
		await load(options.interface, (err: Error | null, root?: Root) => {
			if (err) {
				throw err;
			}

			type = root?.lookupType(options.context);
		});

		if (!type) {
			throw new Error('invalid type');
		}
		return type;
	}
	async serialize(content: Stream, options?: StrategyOptions): Promise<Stream> {
		const internalOptions = this.loadOptions(options);
		const context = await this.load(internalOptions);
		const transform = new Transform({
			transform: (chunk) => {
				return context?.encode(chunk);
			},
		});
		content.pipe(transform);
		return content;
	}
	async deserialize(
		content: Stream,
		options?: StrategyOptions,
	): Promise<Stream> {
		const internalOptions = this.loadOptions(options);
		const context = await this.load(internalOptions);
		const transform = new Transform({
			transform: (chunk) => {
				return context?.decode(chunk);
			},
		});
		content.pipe(transform);
		return content;
	}
}
