[fluent-iterable - v0.1.3](../README.md) / ProtobufStrategy

# Class: ProtobufStrategy<A\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` = `any` |

## Implements

- [SerializerStrategy](../interfaces/serializerstrategy.md)<A, Uint8Array\>

## Table of contents

### Constructors

- [constructor](protobufstrategy.md#constructor)

### Properties

- [type](protobufstrategy.md#type)

### Methods

- [deserialize](protobufstrategy.md#deserialize)
- [load](protobufstrategy.md#load)
- [serialize](protobufstrategy.md#serialize)

## Constructors

### constructor

• **new ProtobufStrategy**<A\>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ProtobufOptions` |

## Properties

### type

• `Private` **type**: `Promise`<Type\>

## Methods

### deserialize

▸ **deserialize**<T\>(`content`): `Promise`<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `Uint8Array` |

#### Returns

`Promise`<T\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[deserialize](../interfaces/serializerstrategy.md#deserialize)

___

### load

▸ `Private` **load**(`options`): `Promise`<Type\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ProtobufOptions` |

#### Returns

`Promise`<Type\>

___

### serialize

▸ **serialize**<T\>(`content`): `Promise`<Uint8Array\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `T` |

#### Returns

`Promise`<Uint8Array\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[serialize](../interfaces/serializerstrategy.md#serialize)
