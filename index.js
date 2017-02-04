const kindOf = require('kind-of')

module.exports = ority

function ority(args, arities, options) {
  if (!args) throw new Error('Need the arguments')
  if (!arities) throw new Error('Need the arities')

  arities = kindOf(arities) === 'array' ? arities : [arities]
  options = options || {}

  if (options.error && kindOf(options.error) !== 'string') {
    throw new Error('error needs to be a string')
  }
  if (options.onError && kindOf(options.onError) !== 'function') {
    throw new Error('onError needs to be a function')
  }

  args = [].slice.call(args)

  const ret = {}

  // narrow down by length
  arities = arities.filter(arity => Object.keys(arity).length === args.length)

  let found
  for (const arity of arities) {
    if (!Object.keys(arity).length) {
      found = arity
      break
    }
    let match = false,
      i = 0
    for (const key in arity) {
      const arg = args[i]
      let art = arity[key]
      if (typeof art === 'string' && art.indexOf('|') > 0) {
        art = art.split(/\|/g);
      }
      const argType = kindOf(arg)
      const artType = kindOf(art)
      if (artType === 'function') {
        match = art(arg, argType, kindOf)
      } else if (artType === 'string') {
        match = argType === art
      } else if (artType === 'array') {
        let arr = art.length <= 1 ? art.concat(['array']) : art
        match = arr.concat(['array']).indexOf(argType) > -1
      } else {
        throw new Error('Invalid arity kind: ' + art)
      }
      i++
    }
    if (match) {
      found = arity
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
    return ret
  } else if (options.onError) {
    return options.onError(closestMatch);
  } else {
    /* Argument signature didn't match with any of the signatures provided */ throw new
    Error(options.error || 'Invalid argument signature: ' + (args.length ? '[' + args.map(kindOf).join(', ') + ']' : 'no arguments provided'));
  }
}
