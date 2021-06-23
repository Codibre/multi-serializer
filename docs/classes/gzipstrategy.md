[fluent-iterable - v0.1.1](../README.md) / GzipStrategy

# Class: GzipStrategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<Stream\>

## Table of contents

### Constructors

- [constructor](gzipstrategy.md#constructor)

### Methods

- [deserialize](gzipstrategy.md#deserialize)
- [serialize](gzipstrategy.md#serialize)

## Constructors

### constructor

• **new GzipStrategy**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `ZlibOptions` |

## Methods

### deserialize

▸ **deserialize**(`content`): `Promise`<Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

`Promise`<Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### serialize

▸ **serialize**(`content`): `Promise`<Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

`Promise`<Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[serialize](../interfaces/chainserializerstrategy.md#serialize)
