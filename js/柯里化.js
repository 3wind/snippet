function curry(fn, ...args) {
  if (fn.length > args.length) {
    return (...args2) => curry(fn, ...args, ...args2);
  }
  return fn(...args);
}

function add(a,b,c,d) {
    return a+b+c+d
}

const add2 = curry(add)
console.log(add2(1,2)(3)(4))
console.log(add2(1)(2)(3)(4))
