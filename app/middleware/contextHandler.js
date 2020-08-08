/**
 * @Description: 请求上下文中间件
 * @Author: chenchen
 * @Date: 2020-05-19 19:36:34
 * @LastEditors: chenchen
 * @LastEditTime: 2020-08-08 17:11:11
 */

module.exports = (option, app) => {
	return async function contextHandler(ctx, next) {
		const url = ctx.request.url
		console.log(
			`\x1B[32m(${new Date().toLocaleString()}): \x1B[0m%s\n`,
			`URL:${url}\nMethod:${ctx.request.method}\nHeader: ${JSON.stringify(
				ctx.request.header
			)}\nRequest body: ${JSON.stringify(ctx.request.body)}`
		)
		await next()
		console.log(
			`\x1B[32m(${new Date().toLocaleString()}): \x1B[0m%s\n`,
			`URL:${url}\nMethod:${ctx.request.method}\nHeader: ${JSON.stringify(
				ctx.response.header
			)}\nResponse body:${JSON.stringify(ctx.response.body)}`
		)
	}
}
