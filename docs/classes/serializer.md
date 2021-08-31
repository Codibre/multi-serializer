[fluent-iterable - v0.4.2](../README.md) / Serializer

# Class: Serializer<MainStrategy, In, FirstOut, Chain, Out\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `MainStrategy` | `MainStrategy`: [SerializerStrategy](../interfaces/serializerstrategy.md)<any, [Serialized](../README.md#serialized)\> |
| `In` | `In`: `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<infer R, any\> ? `R` : `never` = `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<infer R, any\> ? `R` : `never` |
| `FirstOut` | `FirstOut`: `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<any, infer R\> ? `R` : `never` = `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<any, infer R\> ? `R` : `never` |
| `Chain` | `Chain`: [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)[] = [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)[] |
| `Out` | `Out`: `Chain` extends [...ChainSerializerStrategy[], [SerializerStrategy](../interfaces/serializerstrategy.md)<any, infer R\>] ? `R` extends `Stream` ? [Serialized](../README.md#serialized) : `R` : `FirstOut` = `Chain` extends [...ChainSerializerStrategy[], [SerializerStrategy](../interfaces/serializerstrategy.md)<any, infer R\>] ? `R` extends `Stream` ? [Serialized](../README.md#serialized) : `R` : `FirstOut` |

## Table of contents

### Constructors

- [constructor](serializer.md#constructor)

### Properties

- [deserialize](serializer.md#deserialize)
- [serialize](serializer.md#serialize)

## Constructors

### constructor

• **new Serializer**<MainStrategy, In, FirstOut, Chain, Out\>(`strategy`, ...`chain`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MainStrategy` | `MainStrategy`: [SerializerStrategy](../interfaces/serializerstrategy.md)<any, [Serialized](../README.md#serialized), MainStrategy\> |
| `In` | `In`: `any` = `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<R, any\> ? `R` : `never` |
| `FirstOut` | `FirstOut`: [Serialized](../README.md#serialized) = `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<any, R\> ? `R` : `never` |
| `Chain` | `Chain`: [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\>[] = [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\>[] |
| `Out` | `Out`: [Serialized](../README.md#serialized) = `Chain` extends [...ChainSerializerStrategy<Serialized \| Stream\>[], [SerializerStrategy](../interfaces/serializerstrategy.md)<any, R\>] ? `R` extends `Stream` ? [Serialized](../README.md#serialized) : `R` : `FirstOut` |

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
| `In` | `In`: `any` = `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<R, any\> ? `R` : `never` |
| `FirstOut` | `FirstOut`: [Serialized](../README.md#serialized) = `MainStrategy` extends [SerializerStrategy](../interfaces/serializerstrategy.md)<any, R\> ? `R` : `never` |
| `Chain` | `Chain`: [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\>[] = [ChainSerializerStrategy](../interfaces/chainserializerstrategy.md)<[Serialized](../README.md#serialized) \| Stream\>[] |
| `Out` | `Out`: [Serialized](../README.md#serialized) = `Chain` extends [...ChainSerializerStrategy<Serialized \| Stream\>[], [SerializerStrategy](../interfaces/serializerstrategy.md)<any, R\>] ? `R` extends `Stream` ? [Serialized](../README.md#serialized) : `R` : `FirstOut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | `MainStrategy` |
| `options` | [SerializerOptions](../interfaces/serializeroptions.md) |
| `...chain` | `Chain` |

## Properties

### deserialize

• `Readonly` **deserialize**: <T\>(`data`: `Out`) => `T` \| `Promise`<T\>

#### Type declaration

▸ <T\>(`data`): `T` \| `Promise`<T\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: `any` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Out` |

##### Returns

`T` \| `Promise`<T\>

___

### serialize

• `Readonly` **serialize**: <T\>(`data`: `T`) => `Out` \| `Promise`<Out\>

#### Type declaration

▸ <T\>(`data`): `Out` \| `Promise`<Out\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: `any` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

##### Returns

`Out` \| `Promise`<Out\>
