const ority = require('..')
const assert = require('assert')

function fn() {
  return ority(arguments, [{
    name: 'string',
  }, {
    name: 'string',
    data: 'array|object',
  }, {
    name: 'string',
    data: 'array|object',
    opts: 'object',
  }, {
    data: 'array|object',
    opts: 'object',
  }, {
    data: 'array|object',
  }, {}]);
}

describe('2', () => {
  it('should pass', () => {
    // assert.deepEqual(fn(), {})
    // assert.deepEqual(fn('a'), { name: 'a' })
    assert.deepEqual(fn({}, {}), { data: {}, opts: {} })
    // assert.deepEqual(fn(['a']), { name: ['a'] })
    // assert.deepEqual(fn(true), { flag: true })
    // assert.deepEqual(fn('a', {}), { name: 'a', options: {} })
    // assert.deepEqual(fn('a', true), { name: 'a', flag: true })

    // assert.throws(() => fn(true, 'a'))
    // assert.throws(() => fn({}, 'a'))
    // assert.throws(() => fn(1))
  });
});
