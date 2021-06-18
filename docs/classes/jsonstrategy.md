[fluent-iterable - v0.0.1](../README.md) / JsonStrategy

# Class: JsonStrategy

## Implements

- `SerializerStrategy`

## Table of contents

### Constructors

- [constructor](jsonstrategy.md#constructor)

### Properties

- [options](jsonstrategy.md#options)

### Methods

- [deserialize](jsonstrategy.md#deserialize)
- [serialize](jsonstrategy.md#serialize)

## Constructors

### constructor

• **new JsonStrategy**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `JsonOptions` |

## Properties

### options

• `Private` **options**: `JsonOptions`

## Methods

### deserialize

▸ **deserialize**(`content`): `Promise`<Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `Stream` |

#### Returns

`Promise`<Stream\>

#### Implementation of

SerializerStrategy.deserialize

___

### serialize

▸ **serialize**(`content`): `Promise`<Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `Stream` |

#### Returns

`Promise`<Stream\>

#### Implementation of

SerializerStrategy.serialize
