# ority
[![npm](https://img.shields.io/npm/v/ority.svg)](https://www.npmjs.com/package/ority)

Object based arity

Lets you specify arity with an array of objects of name-type pairs:


## Install

```sh
npm install ority
```

## Usage

```js
const ority = require('ority')

function fn () {
  const args = ority(arguments, [{
    name: 'string',
    options: 'object'
  }, {
    name: 'string',
    flag: 'boolean',
  }, {
    name: 'string',
  }, {
    flag: 'boolean',
  }, {
    options: 'object',
  }], {
    defaults: {
      flag: false
    }
  })

  console.log(args)
}
```
```js
fn('a')
// => { name: 'a', flag: false }

fn('a', true)
// => { name: 'a', flag: true }

fn({ json: true })
// => { options: { json: true }, flag: false }
```

### API

```js
ority(args, arities, options)
```

* **`args`** `[arguments]` Arguments from the calling function.
* **`arities`** `[array]` Array of object based arities.
* **`options`** `[object]`

  * **`error`** `[Error|string]` Custom Error to be thrown instead of the default one.
  * **`onError`** `[function]` Custom error handler whose return value gets bubbled up returned to parent caller
  * **`defaults`** `[object]` Default object whose properties are used to set properties not matched/found in the arguments.

## Libraries used

* **[kind-of]**: to perform type comparisons.

[kind-of]: https://www.npmjs.com/package/kind-of
