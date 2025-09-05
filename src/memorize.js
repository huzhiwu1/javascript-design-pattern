function memorize(fn) {
    const cache = {}
    return function () {
        const args = Array.prototype.slice.call(arguments)
        const key = args.join("-")
        console.log("cache = ", cache)
        return cache[key] || (cache[key] = fn.apply(fn, args))
    }
}

function addOne(a) {
    return a + 1
}

const memorizeAddOne = memorize(addOne)

console.log(memorizeAddOne(1))
console.log(memorizeAddOne(1))
console.log(memorizeAddOne(2))
console.log(memorizeAddOne(2))