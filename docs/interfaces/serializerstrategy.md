[fluent-iterable - v0.2.0](../README.md) / SerializerStrategy

# Interface: SerializerStrategy<I, O\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `O` | `O`: [Serialized](../README.md#serialized) \| `Stream` |

## Hierarchy

- **SerializerStrategy**

  ↳ [ChainSerializerStrategy](chainserializerstrategy.md)

## Implemented by

- [JsonStrategy](../classes/jsonstrategy.md)
- [ProtobufStrategy](../classes/protobufstrategy.md)

## Table of contents

### Methods

- [deserialize](serializerstrategy.md#deserialize)
- [serialize](serializerstrategy.md#serialize)

## Methods

### deserialize

▸ **deserialize**(`content`): `I` \| `Promise`<I\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `O` |

#### Returns

`I` \| `Promise`<I\>

___

### serialize

▸ **serialize**(`content`): `O` \| `Promise`<O\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `I` |

#### Returns

`O` \| `Promise`<O\>
