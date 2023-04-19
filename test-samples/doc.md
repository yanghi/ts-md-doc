## fn()


exported function

**Signature**

```ts
fn(arg_1: number, arg_2: number): boolean
```
**example**

```ts
fn(1,2)

```
**Parameters**


| Name  | Type   | Description |
| ----- | ------ | ----------- |
| arg_1 | number |             |
| arg_2 | number |             |

**ReturnType**

boolean

## awsome Namespace


awsome namespace
## awsome.fn()


namespcae functions

**Signature**

```ts
fn(s: string | awsome.InterfaceA): string
```
**Parameters**


| Name | Type                        | Description    |
| ---- | --------------------------- | -------------- |
| s    | string \| awsome.InterfaceA | input argument |

**ReturnType**

string

### awsome.InterfaceA Interface

```ts
interface InterfaceA {
        hello: string;
        world: number;
    }
```
### awsome.EnumA Enum

**Enum members**

| Name | Description     | value |
| ---- | --------------- | ----- |
| one  | enum member one | `0`   |
| two  |                 | `1`   |
### awsome.NamespaceType Type


namespcae type example

```ts
type NamespaceType = Record<string, number>;
```
### AnyObj Type

```ts
export declare type AnyObj = Record<any, any>;
```
### AnyObject Type

```ts
export declare type AnyObject = AnyObj;
```
