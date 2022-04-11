/**
 * 手写call
 * call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
 * @param 绑定的对象
 * @returns this函数执行结果
 */
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 首先获取参数
  let args = [...arguments].slice(1);
  let result = null;
  // 判断 context 是否传入，如果没有传就设置为 window
  context = context || window;
  // 将被调用的方法设置为 context 的属性
  // this 即为我们要调用的方法
  context.fn = this;
  // 执行要被调用的方法
  result = context.fn(...args);
  // 删除手动增加的属性方法
  delete context.fn;
  // 将执行结果返回
  return result;
};

/**
 * 手写apply
 * apply() 方法在使用一个指定的 this 值和参数列表的前提下调用某个函数或方法。
 * @param 绑定的对象
 * @returns this函数执行结果
 */
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  let result = null;
  context = context || window;
  // 与上面代码相比，我们使用 Symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // 执行要被调用的方法
  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }
  delete context[fnSymbol];
  return result;
};

/**
 * 手写bind
 * bind 返回绑定传入对象的函数
 * @param 被绑定的对象
 * @returns 绑定对象后的函数
 */
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 获取参数
  const args = [...arguments].slice(1);
  const fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      // 当前的这个 arguments 是指 Fn 的参数
      args.concat(...arguments)
    );
  };
};

//test
const obj = { value: "test" };
function fn() {
  console.log(this.value, arguments);
}
fn.call(obj, 1, 2);
fn.myCall(obj, 3, 4);
fn.call(obj, 1, 2);

fn.apply(obj, [5, 6]);
fn.myApply(obj, [7, 8]);
fn.apply(obj, [5, 6]);

fn.bind(obj, [9, 10])(11, 12);
fn.myBind(obj, [13, 14])(15, 16);
fn.bind(obj, [9, 10])(11, 12);
