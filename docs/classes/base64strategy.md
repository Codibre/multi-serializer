[fluent-iterable - v0.1.0](../README.md) / Base64Strategy

# Class: Base64Strategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<string\>

## Table of contents

### Constructors

- [constructor](base64strategy.md#constructor)

### Methods

- [deserialize](base64strategy.md#deserialize)
- [serialize](base64strategy.md#serialize)

## Constructors

### constructor

• **new Base64Strategy**()

## Methods

### deserialize

▸ **deserialize**(`content`): `Promise`<[Serialized](../README.md#serialized)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

`Promise`<[Serialized](../README.md#serialized)\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### serialize

▸ **serialize**(`content`): `Promise`<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

`Promise`<string\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[serialize](../interfaces/chainserializerstrategy.md#serialize)
