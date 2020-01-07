/**
 * @Description:用于处理连接逻辑
 * @Author: chenchen
 * @Date: 2019-10-23 15:04:43
 * @LastEditors: chenchen
 * @LastEditTime: 2020-01-07 16:11:09
 */
module.exports = app => {
	return async (ctx, next) => {
		const socketId = ctx.socket.id
		let { userInfo } = ctx.socket.handshake.query
		console.log(userInfo)
		userInfo = JSON.parse(userInfo)
		if (userInfo.user_id) {
			ctx.app.socketIdMaps[userInfo.user_id] = {
				socketId,
				nick_name: userInfo.nick_name,
				avatar: userInfo.avatar
			}
			// 连接成功提示客户端
			console.log(ctx.app.socketIdMaps[userInfo.user_id], "已连接")
			ctx.socket.emit("connected")
			ctx.helper.logOnlineUsers()
		} else {
			ctx.socket.emit("resp", "连接出错，缺少userId")
		}
		await next()
		// 断开连接
		console.log(ctx.app.socketIdMaps[userInfo.user_id], "连接已断开")
		delete ctx.app.socketIdMaps[userInfo.user_id]
		ctx.helper.logOnlineUsers()
	}
}
