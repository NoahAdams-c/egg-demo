/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-08-29 15:07:18
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-14 03:38:25
 */
const Controller = require("egg").Controller

class ChatController extends Controller {
	/**
	 * 获取指定时间段的聊天记录
	 * @param {String} user_id 用户id
	 * @param {String} to_who 接收方id
	 */
	async getRecords() {
		const { ctx, service } = this
		const reqBody = ctx.request.query
		if (!reqBody.user_id) {
			const msg = "参数user_id不合法"
			ctx.body = ctx.helper.packData("fail", msg)
		} else if (!reqBody.to_who) {
			const msg = "参数to_who不合法"
			ctx.body = ctx.helper.packData("fail", msg)
		}
		// 历史消息查询结束时间设为当前时间
		const end_date = new Date()
		// 历史消息查询开始时间设为一天前
		const start_date = new Date(end_date - 24 * 60 * 60 * 1000)
		let records = await service.chat.searchRecordsByFromTo(
			reqBody.user_id,
			reqBody.to_who,
			start_date,
			end_date
		)
		if (records) {
			ctx.body = ctx.helper.packData("success", "", records)
		} else {
			const msg = "查询记录发生错误"
			ctx.body = ctx.helper.packData("fail", msg)
		}
	}
}

module.exports = ChatController
