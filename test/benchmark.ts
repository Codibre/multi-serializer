import { Base64Strategy } from '../src/strategy/base64/index';
import { GzipStrategy } from '../src/strategy/gzip/index';
import Benchmark = require('benchmark');
import { JsonStrategy, Serializer } from '../src';

const benchmarkSuite = new Benchmark.Suite();

const caseJSON = new Serializer(new JsonStrategy());
const jsonStrategy = new JsonStrategy();
const caseJSONGzip = new Serializer(jsonStrategy, new GzipStrategy());
const caseJSONGzipBase64 = new Serializer(
	new JsonStrategy(),
	new GzipStrategy(),
	new Base64Strategy(),
);
const payload = require('./example.json');
let log = '';
console.log(`Node version: ${process.version}`);
benchmarkSuite
	.add('JSON Vanilla', async () => {
		const serialized = JSON.stringify(payload);
		JSON.parse(serialized);
	})
	.add('Just JSON Strategy', async () => {
		const serialized = await jsonStrategy.serialize(payload);
		await jsonStrategy.deserialize(serialized);
	})
	.add('Serializer JSON', async () => {
		const serialized = await caseJSON.serialize(payload);
		await caseJSON.deserialize(serialized);
	})
	.add('Serializer JSON + GZip', async () => {
		const serialized = await caseJSONGzip.serialize(payload);
		await caseJSONGzip.deserialize(serialized);
	})
	.add('Serializer JSON + Gzip + Base64', async () => {
		const serialized = await caseJSONGzipBase64.serialize(payload);
		await caseJSONGzipBase64.deserialize(serialized);
	})
	.on('cycle', function (event: Record<string, string>) {
		log += `${event.target}\n`;
	})
	.on('complete', function (this: any) {
		console.log(log);
	})
	.run({
		async: true,
	});
