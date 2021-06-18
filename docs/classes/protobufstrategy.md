[fluent-iterable - v0.0.1](../README.md) / ProtobufStrategy

# Class: ProtobufStrategy

## Implements

- `SerializerStrategy`

## Table of contents

### Constructors

- [constructor](protobufstrategy.md#constructor)

### Properties

- [context](protobufstrategy.md#context)
- [options](protobufstrategy.md#options)

### Methods

- [deserialize](protobufstrategy.md#deserialize)
- [load](protobufstrategy.md#load)
- [serialize](protobufstrategy.md#serialize)

## Constructors

### constructor

• **new ProtobufStrategy**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ProtobufOptions` |

## Properties

### context

• `Private` **context**: `Promise`<Type\>

___

### options

• `Private` **options**: `ProtobufOptions`

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

▸ **serialize**(`content`): `Promise`<Stream\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `Stream` |

#### Returns

`Promise`<Stream\>

#### Implementation of

SerializerStrategy.serialize
