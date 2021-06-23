[fluent-iterable - v0.1.2](../README.md) / JsonStrategy

# Class: JsonStrategy<A\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` = `any` |

## Implements

- [SerializerStrategy](../interfaces/serializerstrategy.md)<A, [Serialized](../README.md#serialized)\>

## Table of contents

### Constructors

- [constructor](jsonstrategy.md#constructor)

### Properties

- [exec](jsonstrategy.md#exec)

### Methods

- [deserialize](jsonstrategy.md#deserialize)
- [serialize](jsonstrategy.md#serialize)

## Constructors

### constructor

• **new JsonStrategy**<A\>(`options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `JsonOptions` |

## Properties

### exec

• `Private` **exec**: `CallableFunction`

## Methods

### deserialize

▸ **deserialize**<T\>(`content`, `encode?`): `Promise`<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `content` | [Serialized](../README.md#serialized) | `undefined` |
| `encode` | `BufferEncoding` | 'utf-8' |

#### Returns

`Promise`<T\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[deserialize](../interfaces/serializerstrategy.md#deserialize)

___

### serialize

▸ **serialize**<T\>(`content`): `Promise`<[Serialized](../README.md#serialized)\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `T` |

#### Returns

`Promise`<[Serialized](../README.md#serialized)\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[serialize](../interfaces/serializerstrategy.md#serialize)
