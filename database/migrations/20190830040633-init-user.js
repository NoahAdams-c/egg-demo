/**
 * @Description: 创建user表
 * @Author: chenchen
 * @Date: 2019-08-30 12:07:34
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 10:15:46
 */
"use strict"

module.exports = {
	// 在执行数据库升级时调用的函数，创建表
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable("user", {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			user_id: STRING(10),
			password: STRING(10),
			nick_name: STRING(10),
			created_at: DATE,
			updated_at: DATE
		})
	},

	// 在执行数据库降级时调用的函数，删除表
	down: async queryInterface => {
		await queryInterface.dropTable("user")
	}
}
