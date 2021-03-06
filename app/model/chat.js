/**
 * @Description:聊天记录模型
 * @Author: chenchen
 * @Date: 2019-08-30 11:16:52
 * @LastEditors: chenchen
 * @LastEditTime: 2019-11-08 17:15:43
 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize

	const Chat = app.model.define(
		"chat",
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			user_id: STRING(10),
			content: STRING,
			to_who: STRING(10),
			created_at: DATE
		},
		{
			freezeTableName: true,
			timestamps: false
		}
	)

	return Chat
}
