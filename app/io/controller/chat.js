/**
 * @Description:将收到的消息发送给客户端
 * @Author: chenchen
 * @Date: 2019-10-23 15:16:37
 * @LastEditors: chenchen
 * @LastEditTime: 2020-01-07 16:06:18
 */

const { Controller } = require("egg")

class ChatController extends Controller {
	async index() {
		console.log("\n=============chatControllerStart==============")
		const { ctx, service } = this
		const data = ctx.args[0]
		console.log(`收到消息(id:${ctx.socket.id})：`, data)
		const user_id = JSON.parse(ctx.socket.handshake.query.userInfo).user_id
		const { msg, to } = data
		let now = new Date()
		await service.chat.insertNewRecords(user_id, to, msg, now)
		const socketId = ctx.app.socketIdMaps[to].socketId
		const target = ctx.app.io.of("/").sockets[socketId]
		target.emit("resp", { from: user_id, to, msg })
		console.log("===============chatControllerEnd===============\n")
	}
}

module.exports = ChatController
