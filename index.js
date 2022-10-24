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
