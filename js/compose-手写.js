// const compose =
//   (...fns) =>
//   (...args) =>
//     fns.reduceRight((val, fn) => fn.apply(null, [].concat(val)), args);

/**
 * redux中compose实现
 * @param ...funcs 需要合成的多个函数
 * @returns 从右到左把接收到的函数合成后的最终函数
 */
function compose(...funcs) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
const f = (x) => x + 1;
const g = (x) => x * 2;
const t = (x, y) => x + y;

let fgt = compose(f, g, t);
console.log(fgt(1, 2))
// 3 -> 6 -> 7
