[fluent-iterable - v0.3.0](../README.md) / JsonStrategy

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
- [instance](jsonstrategy.md#instance)
- [syncInstance](jsonstrategy.md#syncinstance)

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
| `options?` | [JsonOptions](../interfaces/jsonoptions.md) |

## Properties

### exec

• `Private` **exec**: `CallableFunction`

___

### instance

▪ `Static` `Readonly` **instance**: [JsonStrategy](jsonstrategy.md)<any\>

___

### syncInstance

▪ `Static` `Readonly` **syncInstance**: [JsonStrategy](jsonstrategy.md)<any\>

## Methods

### deserialize

▸ **deserialize**<T\>(`content`, `encode?`): `T` \| `Promise`<T\>

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

`T` \| `Promise`<T\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[deserialize](../interfaces/serializerstrategy.md#deserialize)

___

### serialize

▸ **serialize**<T\>(`content`): [Serialized](../README.md#serialized) \| `Promise`<[Serialized](../README.md#serialized)\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `T` |

#### Returns

[Serialized](../README.md#serialized) \| `Promise`<[Serialized](../README.md#serialized)\>

#### Implementation of

[SerializerStrategy](../interfaces/serializerstrategy.md).[serialize](../interfaces/serializerstrategy.md#serialize)
