fluent-iterable - v0.1.5

# fluent-iterable - v0.1.5

## Table of contents

### Classes

- [Base64Strategy](classes/base64strategy.md)
- [GzipStrategy](classes/gzipstrategy.md)
- [JsonStrategy](classes/jsonstrategy.md)
- [ProtobufStrategy](classes/protobufstrategy.md)
- [Serializer](classes/serializer.md)

### Interfaces

- [ChainSerializerStrategy](interfaces/chainserializerstrategy.md)
- [SerializerStrategy](interfaces/serializerstrategy.md)
- [StrategyStream](interfaces/strategystream.md)

### Type aliases

- [Serialized](README.md#serialized)

### Functions

- [concatStream](README.md#concatstream)
- [isStream](README.md#isstream)
- [pipeStream](README.md#pipestream)

## Type aliases

### Serialized

Ƭ **Serialized**: `string` \| `ArrayBuffer` \| `Uint8Array`

## Functions

### concatStream

▸ **concatStream**(`result`): `string` \| `ArrayBuffer` \| `Promise`<[Serialized](README.md#serialized)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `Stream` \| [Serialized](README.md#serialized) |

#### Returns

`string` \| `ArrayBuffer` \| `Promise`<[Serialized](README.md#serialized)\>

___

### isStream

▸ **isStream**(`stream`): stream is Stream

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `Stream` \| `unknown` |

#### Returns

stream is Stream

___

### pipeStream

▸ **pipeStream**(`content`, `gzip`): `Writable`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](README.md#serialized) \| `Stream` |
| `gzip` | `Writable` |

#### Returns

`Writable`
