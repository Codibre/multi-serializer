[fluent-iterable - v0.4.1](../README.md) / MultiStrategy

# Class: MultiStrategy

## Implements

- [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<Stream \| [Serialized](../README.md#serialized)\>

## Table of contents

### Constructors

- [constructor](multistrategy.md#constructor)

### Properties

- [strategies](multistrategy.md#strategies)

### Methods

- [deserialize](multistrategy.md#deserialize)
- [serialize](multistrategy.md#serialize)

## Constructors

### constructor

• **new MultiStrategy**(`options`, ...`strategies`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [MultiStrategyOptions](../interfaces/multistrategyoptions.md) |
| `...strategies` | [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\> & [OptionalDeserializer](../interfaces/optionaldeserializer.md)[] |

## Properties

### strategies

• `Private` **strategies**: [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\> & [OptionalDeserializer](../interfaces/optionaldeserializer.md)[]

## Methods

### deserialize

▸ **deserialize**(`content`): [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

[Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[deserialize](../interfaces/chainserializerstrategy.md#deserialize)

___

### serialize

▸ **serialize**(`content`): [Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | [Serialized](../README.md#serialized) \| `Stream` |

#### Returns

[Serialized](../README.md#serialized) \| `Stream` \| `Promise`<[Serialized](../README.md#serialized) \| Stream\>

#### Implementation of

[ChainSerializerStrategy](../interfaces/chainserializerstrategy.md).[serialize](../interfaces/chainserializerstrategy.md#serialize)
