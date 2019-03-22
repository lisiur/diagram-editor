/**
 * @param {function} fn
 * @param {array} args
 */
export const partial = (fn, args) => {
    return function() {
        return fn.apply(null, args.concat(Array.from(arguments)))
    }
}

/**
 * curryN.
 * @param {function} fn
 * @param {number} n
 */
export const curryN = (fn, n) => {
    return function() {
        let args = Array.from(arguments)
        if (n <= args.length) {
            return fn.apply(null, args)
        }
        return curryN(partial(fn, args), n - args.length)
    }
}

/**
 * curry.
 * @param {function} fn
 */
export const curry = fn => curryN(fn, fn.length)

/**
 * compose.
 */
export const compose = function(...fns) {
    return function() {
        let index = fns.length - 1
        let result = fns[index--].apply(null, arguments)
        while (index >= 0) {
            result = fns[index--].call(null, result)
        }
        return result
    }
}

/**
 * @param  {...function} fns
 */
export const pipe = (...fns) => compose(...fns.reverse())

export const unary = fn => (...args) => fn(args[0])

export const isNil = a => a === undefined || a === null

export const id = a => a

const _eq = (a, b) => a === b
export const eq = curry(_eq)

const _not = a => !a
export const not = curry(_not)

const _notEq = compose(
    not,
    eq
)
export const notEq = curry(_notEq)

const _map = (fn, arr) => arr.map(unary(fn))
export const map = curry(_map)

const _prop = (propName, obj) => {
    return obj[propName]
}
export const prop = curry(_prop)

const _spread = (fn, arr) => fn(...arr)
export const spread = curry(_spread)

export const ifElse = (check, trueHandler, falseHandler, ...args) =>
    check(...args) ? trueHandler(...args) : falseHandler(...args)

export const T = () => true

export const F = () => false

export const together = (...args) => args

const _tap = (fn, a) => {
    fn(a)
    return a
}
export const tap = curry(_tap)

export const debug = curry(tap)(console.log)
