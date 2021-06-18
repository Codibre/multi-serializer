[fluent-iterable - v0.0.1](../README.md) / Serializer

# Class: Serializer

## Table of contents

### Constructors

- [constructor](serializer.md#constructor)

### Methods

- [deserialize](serializer.md#deserialize)
- [serialize](serializer.md#serialize)

## Constructors

### constructor

• **new Serializer**()

## Methods

### deserialize

▸ **deserialize**<T\>(`data`, `strategy`): `Promise`<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Buffer` |
| `strategy` | `SerializerStrategy` |

#### Returns

`Promise`<T\>

___

### serialize

▸ **serialize**<T\>(`data`, `strategy`): `Promise`<string \| Buffer\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `strategy` | `SerializerStrategy` |

#### Returns

`Promise`<string \| Buffer\>
