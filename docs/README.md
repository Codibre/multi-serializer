fluent-iterable - v0.4.1

# fluent-iterable - v0.4.1

## Table of contents

### Enumerations

- [SerializerMode](enums/serializermode.md)

### Classes

- [Base64Strategy](classes/base64strategy.md)
- [GzipStrategy](classes/gzipstrategy.md)
- [JsonStrategy](classes/jsonstrategy.md)
- [MultiStrategy](classes/multistrategy.md)
- [ProtobufStrategy](classes/protobufstrategy.md)
- [Serializer](classes/serializer.md)

### Interfaces

- [Base64Options](interfaces/base64options.md)
- [ChainSerializerStrategy](interfaces/chainserializerstrategy.md)
- [EnqueueOption](interfaces/enqueueoption.md)
- [GzipOptions](interfaces/gzipoptions.md)
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

- [chainOp](README.md#chainop)
- [concatStream](README.md#concatstream)
- [enqueueTaskFactory](README.md#enqueuetaskfactory)
- [isPromise](README.md#ispromise)
- [isStream](README.md#isstream)
- [pipeStream](README.md#pipestream)
- [preChainOp](README.md#prechainop)
- [promiseFactory](README.md#promisefactory)
- [resolver](README.md#resolver)

## Type aliases

### Serialized

Ƭ **Serialized**: `string` \| `ArrayBuffer` \| `Uint8Array`

## Functions

### chainOp

▸ **chainOp**(`op`, `init`, `keepGoing`, `inc`): (`x`: [Serialized](README.md#serialized) \| `Stream`) => [Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`i`: `number`, `result`: `Stream` \| [Serialized](README.md#serialized)) => [Serialized](README.md#serialized) \| `Stream` \| `Promise`<[Serialized](README.md#serialized) \| Stream\> |
| `init` | `number` |
| `keepGoing` | (`i`: `number`, `r`: [Serialized](README.md#serialized) \| `Stream`) => `boolean` |
| `inc` | `number` |

#### Returns

`fn`

▸ (`x`): [Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [Serialized](README.md#serialized) \| `Stream` |

##### Returns

[Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

___

### concatStream

▸ **concatStream**(`result`): [Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `Stream` \| [Serialized](README.md#serialized) |

#### Returns

[Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

___

### enqueueTaskFactory

▸ **enqueueTaskFactory**<R, T\>(`options`, `queueName`, `cb`): (`data`: `R`) => `T` \| `Promise`<T\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [EnqueueOption](interfaces/enqueueoption.md) \| `undefined` |
| `queueName` | `symbol` |
| `cb` | (`data`: `R`) => `T` \| `Promise`<T\> |

#### Returns

`fn`

▸ (`data`): `T` \| `Promise`<T\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `R` |

##### Returns

`T` \| `Promise`<T\>

___

### isPromise

▸ **isPromise**<T\>(`t`): t is Promise<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `Promise`<T\> \| `T` |

#### Returns

t is Promise<T\>

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

___

### preChainOp

▸ **preChainOp**(`op`, `init`, `keepGoing`, `inc`): (`result`: `Stream` \| [Serialized](README.md#serialized)) => [Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | (`i`: `number`) => (`result`: `Stream` \| [Serialized](README.md#serialized)) => [Serialized](README.md#serialized) \| `Stream` \| `Promise`<[Serialized](README.md#serialized) \| Stream\> |
| `init` | `number` |
| `keepGoing` | (`i`: `number`) => `boolean` |
| `inc` | `number` |

#### Returns

`fn`

▸ (`result`): [Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `Stream` \| [Serialized](README.md#serialized) |

##### Returns

[Serialized](README.md#serialized) \| `Promise`<[Serialized](README.md#serialized)\>

___

### promiseFactory

▸ **promiseFactory**<Args, T\>(`cb`): (...`args`: `Args`) => `Promise`<unknown\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | `Args`: `any`[] |
| `T` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | (...`args`: `Args`) => `T` |

#### Returns

`fn`

▸ (...`args`): `Promise`<unknown\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

##### Returns

`Promise`<unknown\>

___

### resolver

▸ **resolver**<T, R\>(`t`, `cb`): `R` \| `Promise`<R\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `Promise`<T\> \| `T` |
| `cb` | (`t`: `T`) => `R` \| `Promise`<R\> |

#### Returns

`R` \| `Promise`<R\>
