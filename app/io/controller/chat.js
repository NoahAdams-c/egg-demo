/**
 * @Description:将收到的消息发送给客户端
 * @Author: chenchen
 * @Date: 2019-10-23 15:16:37
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 17:17:41
 */

const { Controller } = require("egg")

class ChatController extends Controller {
	async index() {
		console.log("\n=============chatControllerStart==============")
		const { ctx, service } = this
		const data = ctx.args[0]
		console.log(`收到消息(id:${ctx.socket.id})：`, data)
		const userId = ctx.socket.handshake.query.userId
		const { msg, to } = data
		let now = new Date()
		await service.chat.insertNewRecords(userId, to, msg, now)
		const socketId = ctx.app.socketIdMaps[to].socketId
		const target = ctx.app.io.of("/").sockets[socketId]
		target.emit("resp", { from: userId, to, msg })
		console.log("===============chatControllerEnd===============\n")
	}
}

module.exports = ChatController
