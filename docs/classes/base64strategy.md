[fluent-iterable - v0.3.0](../README.md) / Base64Strategy

# Class: Base64Strategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<string\>

## Table of contents

### Constructors

- [constructor](base64strategy.md#constructor)

### Properties

- [instance](base64strategy.md#instance)
- [syncInstance](base64strategy.md#syncinstance)

### Methods

- [deserialize](base64strategy.md#deserialize)
- [serialize](base64strategy.md#serialize)

## Constructors

### constructor

• **new Base64Strategy**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [Base64Options](../interfaces/base64options.md) |

## Properties

### instance

▪ `Static` `Readonly` **instance**: [Base64Strategy](base64strategy.md)

___

### syncInstance

▪ `Static` `Readonly` **syncInstance**: [Base64Strategy](base64strategy.md)

## Methods

### deserialize

▸ **deserialize**(`content`): [Serialized](../README.md#serialized) \| `Promise`<[Serialized](../README.md#serialized)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

[Serialized](../README.md#serialized) \| `Promise`<[Serialized](../README.md#serialized)\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### serialize

▸ **serialize**(`content`): `string` \| `Promise`<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

`string` \| `Promise`<string\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[serialize](../interfaces/chainserializerstrategy.md#serialize)
