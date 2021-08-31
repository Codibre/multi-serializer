[fluent-iterable - v0.4.2](../README.md) / GzipStrategy

# Class: GzipStrategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<Stream \| [Serialized](../README.md#serialized)\>
- [OptionalDeserializer](../interfaces/optionaldeserializer.md)

## Table of contents

### Constructors

- [constructor](gzipstrategy.md#constructor)

### Properties

- [deserialize](gzipstrategy.md#deserialize)
- [serialize](gzipstrategy.md#serialize)

### Methods

- [mustDeserialize](gzipstrategy.md#mustdeserialize)

## Constructors

### constructor

• **new GzipStrategy**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [GzipOptions](../interfaces/gzipoptions.md) |

## Properties

### deserialize

• `Readonly` **deserialize**: (`content`: [Serialized](../README.md#serialized) \| `Stream`) => [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Type declaration

▸ (`content`): [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

##### Returns

[Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### serialize

• `Readonly` **serialize**: (`content`: [Serialized](../README.md#serialized) \| `Stream`) => [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Type declaration

▸ (`content`): [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

##### Returns

[Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[serialize](../interfaces/chainserializerstrategy.md#serialize)

## Methods

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
