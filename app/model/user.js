/**
 * @Description:用户模型
 * @Author: chenchen
 * @Date: 2019-08-30 11:16:52
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 10:22:51
 */

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize

	const User = app.model.define(
		"user",
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			user_id: { type: STRING(10), unique: "compositeIndex" },
			password: STRING(10),
			nick_name: STRING(10),
			created_at: DATE,
			updated_at: DATE
		},
		{
			freezeTableName: true,
			timestamps: false
		}
	)

	return User
}
