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
