/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-08-29 16:42:49
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 10:15:07
 */
const Service = require("egg").Service
const Sequelize = require("sequelize")

class UserService extends Service {
	/**
	 * 	查询全部用户
	 * @param {Number} page_size 单页记录数
	 * @param {Number} current_page 当前页码
	 */
	async searchAll(page_size, current_page) {
		const ctx = this.ctx
		let query = {
			limit: page_size,
			offset: page_size * (current_page - 1)
		}
		let data = await ctx.model.User.findAndCountAll(query)
		return {
			data
		}
	}

	/**
	 * 通过用户名查询指定用户
	 * @param {String} user_id 用户名
	 */
	async searchByUserId(user_id) {
		const ctx = this.ctx
		let query = {
			where: {
				user_id
			}
		}
		let data = await ctx.model.User.findOne(query)
		return data ? data.dataValues : null
	}

	/**
	 * 查询用户是否已存在
	 * @param {String} user_id
	 */
	async isUserExist(user_id) {
		let data = await this.searchByUserId(user_id)
		return !!data
	}

	/**
	 * 插入新用户数据
	 * @param {String} user_id 用户名
	 * @param {String} password 密码
	 * @param {String} nick_name 昵称
	 */
	async insertNewUser(user_id, password, nick_name) {
		const ctx = this.ctx
		let now = new Date()
		let row = {
			user_id,
			password,
			nick_name,
			created_at: now,
			updated_at: now
		}
		let result = ctx.model.User.create(row)
		console.log(result)
		return result
	}
}

module.exports = UserService
