/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-08-29 15:07:18
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 12:51:32
 */
const Controller = require("egg").Controller

class ChatController extends Controller {
	/**
	 * 获取指定时间段的聊天记录
	 * @param {String} user_id 用户id
	 * @param {String} to_who 接收方id
	 * @param {Date} start_date 开始时间
	 * @param {Date} end_date 结束时间
	 */
	async getRecords() {
		const { ctx, service } = this
		const reqBody = ctx.request.query
		let records = await service.chat.searchRecordsByFromTo(
			reqBody.user_id,
			reqBody.to_who,
			reqBody.start_date,
			reqBody.end_date
		)
		if (records) {
			ctx.body = ctx.helper.packData("success", "", records)
		} else {
			ctx.body = ctx.helper.packData("fail", "查询记录发生错误")
		}
	}
}

module.exports = ChatController
