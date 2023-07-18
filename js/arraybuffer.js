/**
 * js二进制数据处理
 */
const buffer = new ArrayBuffer(5);
const view = new DataView(buffer);

const code = 211
const time = new Date().getTime()

view.setUint8(0, code)
view.setUint32(1, time)
console.log(time, '---view---', view)

// const time32 = new Uint32Array([time]).values().next().value;
// console.log(time, '---time32---', time32)

/**
 * 64位时间转32位
 */
const time32 = time >>> 0;
console.log(time, '---time32---', time32)