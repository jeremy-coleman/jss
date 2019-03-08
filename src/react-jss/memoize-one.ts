
//#sad
//const memoize = <Args: Array<any>, Return>(fn: (...args: Args) => Return) => {

type Fn = (...args) => any

const memoize = (fn: Fn) => {
  let lastArgs
  let lastResult

  return (...args) => {
    if (Array.isArray(lastArgs) && args.length === lastArgs.length) {
      let isSame = true

      for (let i = 0; i < args.length; i++) {
        if (args[i] !== lastArgs[i]) {
          isSame = false
        }
      }

      if (isSame) {
        return lastResult
      }
    }

    lastArgs = args
    lastResult = fn(...args)

    return lastResult
  }
}

export default memoize
