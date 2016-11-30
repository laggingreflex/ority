const ority = require ('.')
const assert = require('assert')

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

  return args;
}

assert.deepEqual(fn('a'), {name: 'a'})
assert.deepEqual(fn(true), {flag: true})
assert.deepEqual(fn('a', {}), {name: 'a', options: {}})
assert.deepEqual(fn('a', true), {name: 'a', flag: true})

assert.throws(() => fn(true, 'a'))
assert.throws(() => fn({}, 'a'))
assert.throws(() => fn(1))

console.log('pass')
