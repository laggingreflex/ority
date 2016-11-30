# ority
[![npm](https://img.shields.io/npm/v/ority.svg)](https://www.npmjs.com/package/ority)

Object based arity

Lets you specify arity with an array of objects of name-type pairs:

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
  }])

  console.log(args)
}
```
```js
fn('a')
// => { name: 'a' }

fn('a', true)
// => { name: 'a', flag: true }

fn({ json: true })
// => { options: { json: true } }
```

Uses [kind-of] to perform type comparison. You may also specify a function (instead of a string) which is called with the arg to check.

[kind-of]: https://www.npmjs.com/package/kind-of
