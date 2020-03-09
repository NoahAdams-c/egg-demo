/**
 * @Description:将收到的消息发送给客户端
 * @Author: chenchen
 * @Date: 2019-10-23 15:16:37
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-09 16:46:33
 */

const { Controller } = require("egg")

class ChatController extends Controller {
	async index() {
		const { ctx, app, service } = this
		ctx.helper.logger(
			"Chat Controller",
			"************* Start ***************"
		)
		const redis = app.redis
		const data = ctx.args[0]
		const userInfo = JSON.parse(ctx.socket.handshake.query.userInfo)
		ctx.helper.logger(
			process.pid,
			`${userInfo.user_id}发送消息：${JSON.stringify(data)}`
		)
		const user_id = userInfo.user_id
		const { msg, to } = data
		let now = new Date()
		await service.chat.insertNewRecords(user_id, to, msg, now)
		const toInfo = JSON.parse(
			(await redis.hget("USER_SOCKET_MAP", to)) || ""
		)
		// 每个socket都会自动在连接时加入以自身socketid为房间号的房间
		// 故指定该房间号发送消息相当于指定该socket发送消息
		ctx.app.io.to(toInfo.socketId).emit("resp", { from: user_id, to, msg })
		ctx.helper.logger(
			"Chat Controller",
			"************* End ***************"
		)
	}
}

module.exports = ChatController
