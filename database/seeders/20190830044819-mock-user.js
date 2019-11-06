/**
 * @Description: 生成用户测试数据
 * @Author: chenchen
 * @Date: 2019-08-30 12:59:37
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 10:16:17
 */
"use strict"

const MOCK = require("mockjs")

module.exports = {
	up: async queryInterface => {
		// 在执行数据库升级时调用的函数，插入测试数据
		let userData = MOCK.mock({
			"array|50": [
				{
					user_id: /\w{5,10}/,
					password: /\w{5,10}/,
					nick_name: /\w{5,10}/,
					created_at: new Date(),
					updated_at: new Date()
				}
			]
		}).array
		return queryInterface.bulkInsert("user", userData, {})
	},

	down: async queryInterface => {
		// 在执行数据库降级时调用的函数，删除测试数据
		return queryInterface.bulkDelete("user", null, {})
	}
}
