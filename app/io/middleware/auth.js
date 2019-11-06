/**
 * @Description:用于处理连接逻辑
 * @Author: chenchen
 * @Date: 2019-10-23 15:04:43
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-30 16:58:00
 */
module.exports = app => {
	return async (ctx, next) => {
		const socketId = ctx.socket.id
		const { userId, nickName } = ctx.socket.handshake.query
		if (userId) {
			ctx.app.socketIdMaps[userId] = { socketId, nickName }
			// 连接成功提示客户端
			console.log(ctx.app.socketIdMaps[userId], "已连接")
			ctx.socket.emit("connected")
			ctx.helper.logOnlineUsers()
		} else {
			ctx.socket.emit("resp", "连接出错，缺少userId")
		}
		await next()
		// 断开连接
		console.log(ctx.app.socketIdMaps[userId], "连接已断开")
		delete ctx.app.socketIdMaps[userId]
		ctx.helper.logOnlineUsers()
	}
}
