[fluent-iterable - v0.3.0](../README.md) / GzipStrategy

# Class: GzipStrategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<Stream \| [Serialized](../README.md#serialized)\>
- [OptionalDeserializer](../interfaces/optionaldeserializer.md)

## Table of contents

### Constructors

- [constructor](gzipstrategy.md#constructor)

### Methods

- [deserialize](gzipstrategy.md#deserialize)
- [mustDeserialize](gzipstrategy.md#mustdeserialize)
- [serialize](gzipstrategy.md#serialize)

## Constructors

### constructor

• **new GzipStrategy**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [GzipOptions](../interfaces/gzipoptions.md) |

## Methods

### deserialize

▸ **deserialize**(`content`): [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

[Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### mustDeserialize

▸ **mustDeserialize**(`content`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) |

#### Returns

`boolean`

#### Implementation of

[OptionalDeserializer](../interfaces/optionaldeserializer.md).[mustDeserialize](../interfaces/optionaldeserializer.md#mustdeserialize)

___

### serialize

▸ **serialize**(`content`): [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

[Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[serialize](../interfaces/chainserializerstrategy.md#serialize)
