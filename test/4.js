const ority = require('..')
const assert = require('assert')

function fn() {
  return ority(arguments, [{
    setting: 'string'
  }, {
    promptOpts: 'object'
  }, {
    setting: 'string',
    promptOpts: 'object'
  }, {}]);
}

describe('4', () => {
  it('should pass', () => {
    // assert.deepEqual(fn(), {})
    // assert.deepEqual(fn('a'), { name: 'a' })
    // assert.deepEqual(fn({}, {}), { data: {}, opts: {} })
    let a
    assert.deepEqual(fn(), { })
    // assert.deepEqual(fn(['a']), { name: ['a'] })
    // assert.deepEqual(fn(true), { flag: true })
    // assert.deepEqual(fn('a', {}), { name: 'a', options: {} })
    // assert.deepEqual(fn('a', true), { name: 'a', flag: true })

    // assert.throws(() => fn(true, 'a'))
    // assert.throws(() => fn({}, 'a'))
    // assert.throws(() => fn(1))
  });
});
