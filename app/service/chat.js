/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-08-29 16:42:49
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 13:42:42
 */
const Service = require("egg").Service
const Sequelize = require("sequelize")

class ChatService extends Service {
	/**
	 * 插入新聊天记录
	 * @param {String} user_id 用户id
	 * @param {String} to_who 接收方id
	 * @param {String} content 内容
	 * @param {Date} created_at 产生日期
	 */
	async insertNewRecords(user_id, to_who, content, created_at) {
		const ctx = this.ctx
		let row = {
			user_id,
			to_who,
			content,
			created_at
		}
		let result = ctx.model.Chat.create(row)
		return result
	}

	/**
	 * 查询指定收发方指定时间段的聊天记录
	 * @param {String} user_id
	 * @param {String} to_who
	 * @param {Date} start_date
	 * @param {Date} end_date
	 */
	async searchRecordsByFromTo(user_id, to_who, start_date, end_date) {
		const ctx = this.ctx
		const op = Sequelize.Op
		// let to_query = {
		// 	where: {
		// 		user_id,
		// 		to_who,
		// 		created_at: {
		// 			[op.gte]: start_date,
		// 			[op.lte]: end_date
		// 		}
		// 	}
		// }
		// // 发送记录
		// let to_records = ctx.model.Chat.findAll(to_query)
		// let from_query = {
		// 	where: {
		// 		to_who,
		// 		user_id,
		// 		created_at: {
		// 			[op.gte]: start_date,
		// 			[op.lte]: end_date
		// 		}
		// 	}
		// }
		// // 接收记录
		// let from_recors = ctx.model.Chat.findAll(from_query)

		let query = {
			where: {
				[op.or]: [
					{
						[op.and]: {
							user_id: user_id,
							to_who: to_who
						}
					},
					{
						[op.and]: {
							user_id: to_who,
							to_who: user_id
						}
					}
				],
				created_at: {
					[op.gte]: start_date,
					[op.lte]: end_date
				}
			},
			order: Sequelize.col("created_at")
		}
		// 发送记录
		let data = ctx.model.Chat.findAll(query)

		return data.map(item => {
			return item.dataValues
		})
	}
}

module.exports = ChatService
