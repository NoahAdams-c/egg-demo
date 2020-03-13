/**
 * @Description: 错误处理中间件
 * @Author: chenchen
 * @Date: 2020-03-14 01:33:36
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-14 03:37:52
 */
module.exports = options => {
	return async (ctx, next) => {
		try {
			await next()
		} catch (err) {
			ctx.helper.errorLog(process.pid, err.stack)
			ctx.body = "server error"
			ctx.status = 500
		}
	}
}
