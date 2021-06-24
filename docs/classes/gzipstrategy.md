[fluent-iterable - v0.1.4](../README.md) / GzipStrategy

# Class: GzipStrategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<Stream \| [Serialized](../README.md#serialized)\>

## Table of contents

### Constructors

- [constructor](gzipstrategy.md#constructor)

### Methods

- [deserialize](gzipstrategy.md#deserialize)
- [isGzip](gzipstrategy.md#isgzip)
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

▸ **deserialize**(`content`): `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

`Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### isGzip

▸ `Private` **isGzip**(`content`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

`boolean`

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
