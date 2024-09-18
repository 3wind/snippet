/**
 * new到底做了什么
 * 1、创建一个新的对象
 * 2、继承父类原型上的方法.
 * 3、添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
 * 4、如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。
 */
function _new(obj, ...rest) {
  // 基于obj的原型创建一个新的对象
  const newObj = Object.create(obj.prototype);

  // 添加属性到新创建的newObj上, 并获取obj函数执行的结果.
  const result = obj.apply(newObj, rest);

  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === "object" && result !== null ? result : newObj;
}

//test
function a(ageP) {
  const name = "aName";
  const age = ageP;
  console.log("exec", name, age);
}
const b = new a(11);
const c = _new(a, 12);

console.log(a);
console.log(b);
console.log(c);
