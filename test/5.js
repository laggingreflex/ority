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
  }, {}], {
    defaults: {
      setting: { some: 'setting' }
    }
  });
}

describe('5', () => {
  it('should pass', () => {
    let a
    assert.deepEqual(fn(), {setting: { some: 'setting' }})
  });
});
