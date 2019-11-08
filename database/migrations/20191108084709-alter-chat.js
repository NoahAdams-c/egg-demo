/**
 * @Description: 修改chat表结构
 * @Author: chenchen
 * @Date: 2019-11-08 16:58:01
 * @LastEditors: chenchen
 * @LastEditTime: 2019-11-08 17:10:20
 */
"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { STRING } = Sequelize
		await queryInterface.changeColumn("chat", "content", STRING)
	},

	down: async (queryInterface, Sequelize) => {
		const { STRING } = Sequelize
		await queryInterface.changeColumn("chat", "content", STRING(10))
	}
}
