[fluent-iterable - v0.4.2](../README.md) / StrategyStream

# Interface: StrategyStream

## Hierarchy

- `Stream`

  ↳ **StrategyStream**

## Table of contents

### Methods

- [addListener](strategystream.md#addlistener)
- [emit](strategystream.md#emit)
- [eventNames](strategystream.md#eventnames)
- [getMaxListeners](strategystream.md#getmaxlisteners)
- [listenerCount](strategystream.md#listenercount)
- [listeners](strategystream.md#listeners)
- [off](strategystream.md#off)
- [on](strategystream.md#on)
- [onEnd](strategystream.md#onend)
- [once](strategystream.md#once)
- [pipe](strategystream.md#pipe)
- [prependListener](strategystream.md#prependlistener)
- [prependOnceListener](strategystream.md#prependoncelistener)
- [rawListeners](strategystream.md#rawlisteners)
- [removeAllListeners](strategystream.md#removealllisteners)
- [removeListener](strategystream.md#removelistener)
- [setMaxListeners](strategystream.md#setmaxlisteners)

## Methods

### addListener

▸ **addListener**(`event`, `listener`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.addListener

___

### emit

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

Stream.emit

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

Stream.eventNames

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

Stream.getMaxListeners

___

### listenerCount

▸ **listenerCount**(`event`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

Stream.listenerCount

___

### listeners

▸ **listeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Stream.listeners

___

### off

▸ **off**(`event`, `listener`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.off

___

### on

▸ **on**(`event`, `listener`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.on

___

### onEnd

▸ `Optional` **onEnd**<T\>(`encode?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `encode?` | `BufferEncoding` |

#### Returns

`T`

___

### once

▸ **once**(`event`, `listener`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.once

___

### pipe

▸ **pipe**<T\>(`destination`, `options?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: `WritableStream`<T\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `T` |
| `options?` | `Object` |
| `options.end?` | `boolean` |

#### Returns

`T`

#### Inherited from

Stream.pipe

___

### prependListener

▸ **prependListener**(`event`, `listener`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.prependListener

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.prependOnceListener

___

### rawListeners

▸ **rawListeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Stream.rawListeners

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.removeAllListeners

___

### removeListener

▸ **removeListener**(`event`, `listener`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.removeListener

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [StrategyStream](strategystream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[StrategyStream](strategystream.md)

#### Inherited from

Stream.setMaxListeners
