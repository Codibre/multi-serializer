[fluent-iterable - v0.4.0](../README.md) / GzipOptions

# Interface: GzipOptions

## Hierarchy

- `ZlibOptions`

  ↳ **GzipOptions**

## Table of contents

### Properties

- [chunkSize](gzipoptions.md#chunksize)
- [dictionary](gzipoptions.md#dictionary)
- [finishFlush](gzipoptions.md#finishflush)
- [flush](gzipoptions.md#flush)
- [info](gzipoptions.md#info)
- [level](gzipoptions.md#level)
- [maxOutputLength](gzipoptions.md#maxoutputlength)
- [memLevel](gzipoptions.md#memlevel)
- [mode](gzipoptions.md#mode)
- [strategy](gzipoptions.md#strategy)
- [windowBits](gzipoptions.md#windowbits)

## Properties

### chunkSize

• `Optional` **chunkSize**: `number`

**`default`** 16*1024

#### Inherited from

ZlibOptions.chunkSize

___

### dictionary

• `Optional` **dictionary**: `ArrayBuffer` \| `ArrayBufferView`

#### Inherited from

ZlibOptions.dictionary

___

### finishFlush

• `Optional` **finishFlush**: `number`

**`default`** constants.Z_FINISH

#### Inherited from

ZlibOptions.finishFlush

___

### flush

• `Optional` **flush**: `number`

**`default`** constants.Z_NO_FLUSH

#### Inherited from

ZlibOptions.flush

___

### info

• `Optional` **info**: `boolean`

#### Inherited from

ZlibOptions.info

___

### level

• `Optional` **level**: `number`

#### Inherited from

ZlibOptions.level

___

### maxOutputLength

• `Optional` **maxOutputLength**: `number`

#### Inherited from

ZlibOptions.maxOutputLength

___

### memLevel

• `Optional` **memLevel**: `number`

#### Inherited from

ZlibOptions.memLevel

___

### mode

• `Optional` **mode**: [SerializerMode](../enums/serializermode.md)

___

### strategy

• `Optional` **strategy**: `number`

#### Inherited from

ZlibOptions.strategy

___

### windowBits

• `Optional` **windowBits**: `number`

#### Inherited from

ZlibOptions.windowBits
