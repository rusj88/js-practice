//custom implementation of bind

Function.prototype.myBind = function(ctx, ...args) {
  return (...rest) => {
    const uniqueId = Symbol('id')
    ctx[uniqueId] = this
    const result = ctx[uniqueId](...args, ...rest)
    delete ctx[uniqueId]
    return result
  }
}

//custom implementation of map

 Array.prototype.map = function(cb, ctx) {
   const newArr = []
   newArr.length = this.length
   for (let i = 0; i < this.length; i++) {
     if (i in this) {
      newArr[i] = (cb.call(ctx, this[i], i, this))
     }
   }
   return newArr
 }

//function to flatten an array

function flatten(array) {
  const res = []
  const helper = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i]
      if (Array.isArray(elem)) {
        helper(elem)
      } else {
        res.push(elem)
      }
    }
  }
  helper(array)
  return res
}

//function for comparing objects

function deepEqual(obj1, obj2) {
	const isObject = (obj) => typeof obj === "object";
	const isNull = (obj) => obj === null;

	if ((!isObject(obj1) && !isObject(obj2)) || isNull(obj1) || isNull(obj2)) {
		return obj1 === obj2;
	}

	if (Object.keys(obj1).length != Object.keys(obj2).length) {
		return false;
	}

	for (key in obj1) {
		if (
			!isObject(obj1[key]) &&
			!isObject(obj2[key]) &&
			obj1[key] !== obj2[key]
		) {
			return false;
		}
		if (
			isObject(obj1) &&
			isObject(obj2) &&
			!deepEqual(obj1[key], obj2[key])
		) {
			return false;
		}
	}
	return true;
}

//debounce implementation

const debounce = (fn, debounceTime) => {
  let timerId;
  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(fn.bind(this, ...arguments), debounceTime);
  };
};

//throttle implementation

const throttle = (fn, throttleTime) => {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
      setTimeout(() => (called = false), throttleTime);
    }
  };
}

//Promise.all() implementation

async function promiseAll(promises) {
let arr = []
for (let i = 0; i < promises.length; i++) {
    arr[i] = (await promises[i])
}
return arr
}
