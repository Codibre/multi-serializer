[fluent-iterable - v0.3.0](../README.md) / ProtobufStrategy

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
| `options` | [ProtobufOptions](../interfaces/protobufoptions.md) \| `Type` |

## Properties

### type

• `Private` **type**: `Type` \| `Promise`<Type\>

## Methods

### deserialize

▸ **deserialize**<T\>(`content`): `T` \| `Promise`<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `Uint8Array` |

#### Returns

`T` \| `Promise`<T\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[deserialize](../interfaces/serializerstrategy.md#deserialize)

___

### load

▸ `Private` **load**(`options`): `Promise`<Type\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [ProtobufOptions](../interfaces/protobufoptions.md) |

#### Returns

`Promise`<Type\>

___

### serialize

▸ **serialize**<T\>(`content`): `Uint8Array` \| `Promise`<Uint8Array\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `T` |

#### Returns

`Uint8Array` \| `Promise`<Uint8Array\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[serialize](../interfaces/serializerstrategy.md#serialize)
