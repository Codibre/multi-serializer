[fluent-iterable - v0.4.1](../README.md) / Base64Strategy

# Class: Base64Strategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<string\>

## Table of contents

### Constructors

- [constructor](base64strategy.md#constructor)

### Properties

- [deserialize](base64strategy.md#deserialize)
- [serialize](base64strategy.md#serialize)
- [instance](base64strategy.md#instance)
- [syncInstance](base64strategy.md#syncinstance)

## Constructors

### constructor

• **new Base64Strategy**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [Base64Options](../interfaces/base64options.md) |

## Properties

### deserialize

• `Readonly` **deserialize**: (`content`: [Serialized](../README.md#serialized) \| `Stream`) => [Serialized](../README.md#serialized) \| `Promise`<[Serialized](../README.md#serialized)\>

#### Type declaration

▸ (`content`): [Serialized](../README.md#serialized) \| `Promise`<[Serialized](../README.md#serialized)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

##### Returns

[Serialized](../README.md#serialized) \| `Promise`<[Serialized](../README.md#serialized)\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### serialize

• `Readonly` **serialize**: (`content`: [Serialized](../README.md#serialized) \| `Stream`) => `string` \| `Promise`<string\>

#### Type declaration

▸ (`content`): `string` \| `Promise`<string\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

##### Returns

`string` \| `Promise`<string\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[serialize](../interfaces/chainserializerstrategy.md#serialize)

___

### instance

▪ `Static` `Readonly` **instance**: [Base64Strategy](base64strategy.md)

___

### syncInstance

▪ `Static` `Readonly` **syncInstance**: [Base64Strategy](base64strategy.md)
