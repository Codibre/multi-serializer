[fluent-iterable - v0.2.0](../README.md) / Serializer

# Class: Serializer<MainStrategy, In, FirstOut, Chain, Out\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `MainStrategy` | `MainStrategy`: [SerializerStrategy](../interfaces/serializerstrategy.md)<any, [Serialized](../README.md#serialized)\> |
| `In` | `In`: `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<infer R, any\> ? `R` : `never` |
| `FirstOut` | `FirstOut`: `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<any, infer R\> ? `R` : `never` |
| `Chain` | `Chain`: [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)[] |
| `Out` | `Out`: `Chain` extends [...ChainSerializerStrategy[], [SerializerStrategy](../interfaces/serializerstrategy.md)<any, infer R\>] ? `R` extends `Stream` ? [Serialized](../README.md#serialized) : `R` : `FirstOut` |

## Table of contents

### Constructors

- [constructor](serializer.md#constructor)

### Properties

- [chain](serializer.md#chain)
- [lastChain](serializer.md#lastchain)
- [options](serializer.md#options)
- [queue](serializer.md#queue)

### Methods

- [deserialize](serializer.md#deserialize)
- [serialize](serializer.md#serialize)
- [serializeFactory](serializer.md#serializefactory)

## Constructors

### constructor

• **new Serializer**<MainStrategy, In, FirstOut, Chain, Out\>(`strategy`, ...`chain`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MainStrategy` | `MainStrategy`: [SerializerStrategy](../interfaces/serializerstrategy.md)<any, [Serialized](../README.md#serialized), MainStrategy\> |
| `In` | `In`: `any` |
| `FirstOut` | `FirstOut`: [Serialized](../README.md#serialized) |
| `Chain` | `Chain`: [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\>[] |
| `Out` | `Out`: [Serialized](../README.md#serialized) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | `MainStrategy` |
| `...chain` | `Chain` |

• **new Serializer**<MainStrategy, In, FirstOut, Chain, Out\>(`strategy`, `options`, ...`chain`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MainStrategy` | `MainStrategy`: [SerializerStrategy](../interfaces/serializerstrategy.md)<any, [Serialized](../README.md#serialized), MainStrategy\> |
| `In` | `In`: `any` |
| `FirstOut` | `FirstOut`: [Serialized](../README.md#serialized) |
| `Chain` | `Chain`: [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\>[] |
| `Out` | `Out`: [Serialized](../README.md#serialized) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | `MainStrategy` |
| `options` | [SerializerOptions](../interfaces/serializeroptions.md) |
| `...chain` | `Chain` |

## Properties

### chain

• `Private` `Readonly` **chain**: `Chain`

___

### lastChain

• `Private` `Readonly` **lastChain**: `number`

___

### options

• `Private` `Readonly` **options**: [SerializerOptions](../interfaces/serializeroptions.md)

___

### queue

• `Private` **queue**: `symbol`

## Methods

### deserialize

▸ **deserialize**<T\>(`data`): `Promise`<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Out` |

#### Returns

`Promise`<T\>

___

### serialize

▸ **serialize**<T\>(`data`): `Promise`<Out\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

`Promise`<Out\>

___

### serializeFactory

▸ `Private` **serializeFactory**<T\>(`data`): () => `Promise`<Out\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

`fn`

▸ (): `Promise`<Out\>

##### Returns

`Promise`<Out\>
