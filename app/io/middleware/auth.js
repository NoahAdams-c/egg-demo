/**
 * @Description:用于处理连接逻辑
 * @Author: chenchen
 * @Date: 2019-10-23 15:04:43
 * @LastEditors: chenchen
 * @LastEditTime: 2020-01-07 15:10:15
 */
module.exports = app => {
	return async (ctx, next) => {
		const socketId = ctx.socket.id
		let { userInfo } = ctx.socket.handshake.query
		userInfo = JSON.parse(userInfo)
		if (userInfo.userId) {
			ctx.app.socketIdMaps[userInfo.userId] = {
				socketId,
				nickName: userInfo.nickName,
				avatar: userInfo.avatar
			}
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
