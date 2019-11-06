/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-08-29 15:07:18
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 17:40:24
 */
const Controller = require("egg").Controller

class UserController extends Controller {
	/**
	 * 获取用户记录
	 * @param {Number} page_size 单页记录数
	 * @param {Number} current_page 当前页码
	 */
	async getUsers() {
		const { ctx, service } = this
		// // 参数规则
		// const rule = {
		// 	page_size: "number",
		// 	current_page: "number"
		// }
		// // 校验参数
		// ctx.validate(rule)

		// 请求参数
		const reqBody = ctx.request.query
		const result = await service.user.searchAll(
			parseInt(reqBody.page_size),
			parseInt(reqBody.current_page)
		)
		ctx.body = result
	}

	/**
	 * 登录
	 * @param {String} user_id 用户名
	 * @param {String} password 密码
	 */
	async login() {
		const { ctx, service } = this
		const reqBody = ctx.request.query
		const result = await service.user.searchByUserId(reqBody.user_id)
		if (result && result.password === reqBody.password) {
			ctx.body = ctx.helper.packData("success", "", result)
		} else {
			ctx.body = ctx.helper.packData("fail", "用户名或密码错误")
		}
	}

	/**
	 * 注册
	 * @param {String} user_id 用户名
	 * @param {String} password 密码
	 * @param {String} nick_name 昵称
	 */
	async regist() {
		const { ctx, service } = this
		const reqBody = ctx.request.body
		const isExist = await service.user.isUserExist(reqBody.user_id)
		if (isExist) {
			ctx.body = ctx.helper.packData("fail", "用户名已存在")
		} else {
			const result = await service.user.insertNewUser(
				reqBody.user_id,
				reqBody.password,
				reqBody.nick_name
			)
			if (result) {
				console.log(result)
				ctx.body = ctx.helper.packData("success")
			}
		}
	}
}

module.exports = UserController
