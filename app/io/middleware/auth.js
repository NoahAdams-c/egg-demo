/**
 * @Description:用于处理连接逻辑
 * @Author: chenchen
 * @Date: 2019-10-23 15:04:43
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-09 15:56:58
 */
module.exports = app => {
	return async (ctx, next) => {
		const socketId = ctx.socket.id
		const address = ctx.socket.handshake.address
		const redis = app.redis
		let { userInfo } = ctx.socket.handshake.query
		ctx.helper.logger(process.pid, userInfo + " " + address)
		userInfo = JSON.parse(userInfo)
		if (userInfo.user_id) {
			const jsonObj = JSON.stringify({
				socketId,
				nick_name: userInfo.nick_name,
				avatar: userInfo.avatar
			})
			await redis.hset("USER_SOCKET_MAP", userInfo.user_id, jsonObj)
			// 连接成功提示客户端
			ctx.helper.logger(process.pid, userInfo.user_id + "已连接")
			ctx.socket.emit("connected")
			app.io.of("/").adapter.clients((err, clients) => {
				// 打印所有连接上的客户端id的数组
				ctx.helper.logger(
					"All socket connections",
					JSON.stringify(clients)
				)
			})
			ctx.helper.logOnlineUsers()
		} else {
			ctx.socket.emit("resp", "连接出错，缺少userId")
		}
		await next()
		// 断开连接
		ctx.helper.logger(process.pid, userInfo.user_id + "已断开连接")
		await redis.hdel("USER_SOCKET_MAP", userInfo.user_id)
		ctx.helper.logOnlineUsers()
	}
}
