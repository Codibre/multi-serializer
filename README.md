[![Actions Status](https://github.com/Codibre/multi-serializer/workflows/build/badge.svg)](https://github.com/Codibre/multi-serializer/actions)
[![Actions Status](https://github.com/Codibre/multi-serializer/workflows/test/badge.svg)](https://github.com/Codibre/multi-serializer/actions)
[![Actions Status](https://github.com/Codibre/multi-serializer/workflows/lint/badge.svg)](https://github.com/Codibre/multi-serializer/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/65e41e3018643f28168e/test_coverage)](https://codeclimate.com/github/Codibre/multi-serializer/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/65e41e3018643f28168e/maintainability)](https://codeclimate.com/github/Codibre/multi-serializer/maintainability)
[![Packages](https://david-dm.org/Codibre/multi-serializer.svg)](https://david-dm.org/Codibre/multi-serializer)
[![npm version](https://badge.fury.io/js/%40codibre%2Fmulti-serializer.svg)](https://badge.fury.io/js/%40codibre%2Fmulti-serializer)

This lib aim to offer an optimized and standardized way to combine multiple serializing strategies into one simple call

## How to Install

```
npm i multi-serializer
```

## How to use it

Create your serializer instance once:

```ts
const serializer = new Serializer(
  new JsonStrategy(),
  new GzipStrategy(),
  new Base64Strategy()
);
```

Use it multiple times:
```ts
// to serialize
const serialized = await serializer.serialize(content);

// to deserialize
const deserialized = await serializer.deserialize(content);
```

## Multi serializer

Sometimes you don't know how some information are encoded, but you want to deserialize seamlessly. Strategies that implements the [OptionalDeserializer](./src/strategy/multi/types/index.ts) come for the rescue!

```ts
const serializer = new Serializer(
  new JsonStrategy(),
  new MultiStrategy({
      serializers: [0],
    },
    new GzipStrategy(),
    new MagicBrotliStrategy(),
  ),
  new Base64Strategy()
);
```

With the example above, when serializing, the GzipStrategy (the index 0 one) will be used for the job, but when deserializing, MultiStrategy will check if the content is a valid gzip or a valid [magic brotli](https://www.npmjs.com/package/@multi-serializer/magic-brotli) to decide! It's important to point out that only strategies that implements the OptionalDeserializer must be used with MultiStrategy

## Extending functionalities

You can implement your own strategy, you just need to implement the [SerializerStrategy](./src/strategy/serializer.ts) or the [ChainSerializerStrategy](.src/strategy/serializer.ts) interfaces!
* The SerializerStrategy must be implemented if you want to create a strategy that will be the main strategy informed. The SerializerStrategy cannot be used as secondary strategy!
* The ChainSerializerStrategy must be implemented when you want to create a strategy to be chained after the main one!

ChainSerializerStrategies can also be used as main strategies, but the return will be of the type **Serialized**, not a custom type you want to.

## License

Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License).
