/**
 * @Description: 修改user表结构
 * @Author: chenchen
 * @Date: 2019-12-09 15:09:33
 * @LastEditors: chenchen
 * @LastEditTime: 2019-12-09 15:16:12
 */
"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { STRING } = Sequelize
		await queryInterface.addColumn("user", "avatar", STRING)
	},

	down: async queryInterface => {
		await queryInterface.removeColumn("user", "avatar")
	}
}
