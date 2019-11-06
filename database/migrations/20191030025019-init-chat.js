/**
 * @Description: 创建chat表
 * @Author: chenchen
 * @Date: 2019-10-30 10:52:04
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 10:52:25
 */
"use strict"

module.exports = {
	// 在执行数据库升级时调用的函数，创建表
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable("chat", {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			user_id: STRING(10),
			content: STRING(10),
			to_who: STRING(10),
			created_at: DATE
		})
	},

	// 在执行数据库降级时调用的函数，删除表
	down: async queryInterface => {
		await queryInterface.dropTable("chat")
	}
}
