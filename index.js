const kindOf = require('kind-of')

module.exports = ority

function ority(args, arities, options) {
  if (!args) throw new Error('Need the arguments')
  if (!arities) throw new Error('Need the arities')

  arities = kindOf(arities) === 'array' ? arities : [arities]
  options = options || {}

  const orgArities = arities;

  if (options.error && kindOf(options.error) !== 'string') {
    throw new Error('error needs to be a string')
  }
  if (options.onError && kindOf(options.onError) !== 'function') {
    throw new Error('onError needs to be a function')
  }
  options.defaults = options.defaults || {};

  args = [].slice.call(args)

  // remove extraneous args
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] === 'undefined') {
      args.pop();
    } else {
      break;
    }
  }

  const ret = {}

  // narrow down by length
  arities = arities.filter(arity => Object.keys(arity).length === args.length)

  let found, closestMatch;
  for (const arity of arities) {
    if (!Object.keys(arity).length) {
      found = closestMatch = arity
      break
    }
    let match
    let i = 0
    for (const key in arity) {
      const arg = args[i]
      let art = arity[key]
      if (typeof art === 'string' && art.indexOf('|') > 0) {
        art = art.split(/\|/g);
      }
      const argType = kindOf(arg)
      const artType = kindOf(art)
      if (artType === 'function') {
        let argMatch = art(arg, argType, kindOf);
        if (match === undefined) {
          match = argMatch
        } else {
          match = match && argMatch
        }
      } else if (artType === 'string') {
        let argMatch = argType === art;
        if (match === undefined) {
          match = argMatch
        } else {
          match = match && argMatch
        }
      } else if (artType === 'array') {
        let arr = art.length <= 1 ? art.concat(['array']) : art
        let argMatch = arr.concat(['array']).indexOf(argType) > -1;
        if (match === undefined) {
          match = argMatch
        } else {
          match = match && argMatch
        }
      } else {
        throw new Error('Invalid arity kind: ' + art)
      }
      i++
    }
    if (match) {
      found = closestMatch = arity
      break
    }
  }

  if (found) {
    const ret = {}
    let i = 0
    for (const key in found) {
      const arg = args[i]
      ret[key] = arg
      i++
    }
    for (const key in options.defaults) {
      if (!(key in ret)) {
        ret[key] = options.defaults[key]
      }
    }
    return ret
  } else if (options.onError) {
    return options.onError(closestMatch);
  } else {
    const received = args.length
      ? '[' + args.map(kindOf).join(', ') + ']'
      : 'no arguments provided';
    let expected = '[';
    for (const arity of orgArities) {
      for (const key in arity) {
        let art = arity[key];
        expected += art + ', ';
      }
      expected = expected.substr(0, expected.length - (Object.keys(arity).length ? 2 : 0)) + '] [';
    }
    expected = expected.substr(0, expected.length - 3) + ']';
    throw new Error(options.error || ('Invalid argument signature'
      + '. Received ' + received
      + '. Expected ' + expected
    ));
  }
}
