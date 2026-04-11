let q = "something"

console.log(typeof q)
console.log(typeof "1")
console.log(typeof "ab12c")

let lenofq = q.length
console.log({lenofq})

let charAt5 = q.charAt(5)
console.log({charAt5})

let sliceThing = q.slice(4,8)
let sliceThing1 = q.slice(4,q.length)
console.log({sliceThing})
console.log({sliceThing1})

const w = "Hello World     "
console.log(w.length)

let trimmed = w.trim()
console.log(trimmed.length)