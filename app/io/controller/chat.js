/**
 * @Description:将收到的消息发送给客户端
 * @Author: chenchen
 * @Date: 2019-10-23 15:16:37
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-09 15:58:47
 */

const { Controller } = require("egg")

class ChatController extends Controller {
	async index() {
		const { ctx, app, service } = this
		ctx.helper.logger("Chat Controller Start")
		const redis = app.redis
		const data = ctx.args[0]
		ctx.helper.logger(
			process.pid,
			`收到消息(id:${ctx.socket.id})：\n${data}`
		)
		const user_id = JSON.parse(ctx.socket.handshake.query.userInfo).user_id
		const { msg, to } = data
		let now = new Date()
		await service.chat.insertNewRecords(user_id, to, msg, now)
		const toInfo = JSON.parse(
			(await redis.hget("USER_SOCKET_MAP", to)) || ""
		)
		const target = ctx.app.io.of("/").sockets[toInfo.socketId]
		target.emit("resp", { from: user_id, to, msg })
		ctx.helper.logger("Chat Controller End")
	}
}

module.exports = ChatController
