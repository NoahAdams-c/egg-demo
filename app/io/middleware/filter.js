/**
 * @Description:控制台打印收到的数据
 * @Author: chenchen
 * @Date: 2019-10-23 15:08:27
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-25 12:58:08
 */
module.exports = app => {
  return async (ctx, next) => {
    await next()
  }
}
