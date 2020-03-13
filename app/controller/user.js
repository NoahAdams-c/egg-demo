/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-08-29 15:07:18
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-14 03:38:38
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
		// 请求参数
		const reqBody = ctx.request.query
		const result = await service.user.searchAll(
			parseInt(reqBody.page_size),
			parseInt(reqBody.current_page)
		)
		ctx.body = result
	}

	/**
	 * 获取用户信息
	 * @param {String} user_id 用户名
	 */
	async getUserInfo() {
		const { ctx, service } = this
		const user_id = ctx.params.userid
		if (user_id === "undefined" || user_id === "null") {
			const msg = "参数user_id不合法"
			ctx.body = ctx.helper.packData("fail", msg)
		}
		const result = await service.user.searchByUserId(user_id)
		if (result) {
			ctx.body = ctx.helper.packData("success", "", {
				nick_name: result.nick_name,
				avatar: result.avatar
			})
		} else {
			const msg = "用户不存在"
			ctx.body = ctx.helper.packData("fail", msg)
		}
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
			const msg = "用户名或密码错误"
			ctx.body = ctx.helper.packData("fail", msg)
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
			const msg = "用户名已存在"
			ctx.body = ctx.helper.packData("fail", msg)
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

	/**
	 * 上传头像
	 */
	async uploadAvatar() {
		const { ctx, service } = this
		const userid = ctx.params.userid
		const stream = await ctx.getFileStream()
		const result = await service.user.updateAvatar(userid, stream)
		if (result) {
			ctx.body = ctx.helper.packData("success", "", result)
		} else {
			const msg = "上传失败"
			ctx.body = ctx.helper.packData("fail", msg)
		}
	}
}

module.exports = UserController
