// 是否是引用类型，具体指使用typeof类型为object，并且不是null的值
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
const toString = Object.prototype.toString;
function getTag(value) {
  return toString.call(value);
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != "[object Object]") {
    return false;
  }
  // 例如：Object.create(null)
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  // 循环遍历对象，如果是自定义构造器实例化的object则返回false
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

function deepMerge(obj1, obj2) {
  let isPlain1 = isPlainObject(obj1);
  let isPlain2 = isPlainObject(obj2);
  if (!isPlain1) {
    return obj2;
  }
  if (!isPlain2) {
    return obj1;
  }
  [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)].forEach(
    (key) => {
      //与浅拷贝区别之处
      obj1[key] = deepMerge(obj1[key], obj2[key]);
    }
  );
  return obj1;
}
let obj1 = {
  a: "a1",
  b: "b1",
  c: {
    d: "c1",
    e: "c2",
  },
};
let obj2 = {
  a: "a2",
  c: {
    d: "c3",
  },
};

