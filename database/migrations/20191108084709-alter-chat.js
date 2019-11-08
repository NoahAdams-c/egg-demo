/**
 * @Description: 修改chat表结构
 * @Author: chenchen
 * @Date: 2019-11-08 16:58:01
 * @LastEditors: chenchen
 * @LastEditTime: 2019-11-08 16:58:41
 */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { STRING } = Sequelize
		await queryInterface.changeColumn("chat", "content", STRING)
  },

  down: (queryInterface, Sequelize) => {
    const { STRING } = Sequelize
		await queryInterface.changeColumn("chat", "content", STRING(10))
  }
};
