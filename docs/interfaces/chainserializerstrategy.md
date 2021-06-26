[fluent-iterable - v0.2.0](../README.md) / ChainSerializerStrategy

# Interface: ChainSerializerStrategy<O\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `O` | `O`: [Serialized](../README.md#serialized) \| `Stream` = [Serialized](../README.md#serialized) \| `Stream` |

## Hierarchy

- [SerializerStrategy](serializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream, O\>

  ↳ **ChainSerializerStrategy**

## Implemented by

- [Base64Strategy](../classes/base64strategy.md)
- [GzipStrategy](../classes/gzipstrategy.md)
- [MultiStrategy](../classes/multistrategy.md)

## Table of contents

### Methods

- [deserialize](chainserializerstrategy.md#deserialize)
- [serialize](chainserializerstrategy.md#serialize)

## Methods

### deserialize

▸ **deserialize**(`content`): [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `O` |

#### Returns

[Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Inherited from

[SerializerStrategy](serializerstrategy.md).[deserialize](serializerstrategy.md#deserialize)

___

### serialize

▸ **serialize**(`content`): `O` \| `Promise`<O\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

`O` \| `Promise`<O\>

#### Inherited from

[SerializerStrategy](serializerstrategy.md).[serialize](serializerstrategy.md#serialize)
