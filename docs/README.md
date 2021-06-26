fluent-iterable - v0.2.0

# fluent-iterable - v0.2.0

## Table of contents

### Classes

- [Base64Strategy](classes/base64strategy.md)
- [GzipStrategy](classes/gzipstrategy.md)
- [JsonStrategy](classes/jsonstrategy.md)
- [MultiStrategy](classes/multistrategy.md)
- [ProtobufStrategy](classes/protobufstrategy.md)
- [Serializer](classes/serializer.md)

### Interfaces

- [ChainSerializerStrategy](interfaces/chainserializerstrategy.md)
- [EnqueueOption](interfaces/enqueueoption.md)
- [JsonOptions](interfaces/jsonoptions.md)
- [MultiStrategyOptions](interfaces/multistrategyoptions.md)
- [OptionalDeserializer](interfaces/optionaldeserializer.md)
- [ProtobufOptions](interfaces/protobufoptions.md)
- [SerializerOptions](interfaces/serializeroptions.md)
- [SerializerStrategy](interfaces/serializerstrategy.md)
- [StrategyStream](interfaces/strategystream.md)

### Type aliases

- [Serialized](README.md#serialized)

### Functions

- [concatStream](README.md#concatstream)
- [enqueueTask](README.md#enqueuetask)
- [isStream](README.md#isstream)
- [pipeStream](README.md#pipestream)

## Type aliases

### Serialized

Ƭ **Serialized**: `string` \| `ArrayBuffer` \| `Uint8Array`

## Functions

### concatStream

▸ **concatStream**(`result`): [Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `Stream` \| [Serialized](README.md#serialized) |

#### Returns

[Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

___

### enqueueTask

▸ **enqueueTask**<T\>(`options`, `queueName`, `cb`): `T` \| `PromiseLike`<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [EnqueueOption](interfaces/enqueueoption.md) \| `undefined` |
| `queueName` | `symbol` |
| `cb` | () => `T` \| `PromiseLike`<T\> |

#### Returns

`T` \| `PromiseLike`<T\>

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
