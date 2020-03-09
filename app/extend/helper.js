/**
 * @Description: 扩展工具函数
 * @Author: chenchen
 * @Date: 2019-10-28 12:43:52
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-09 15:56:02
 */
const { logger } = require("cc-vue-util/common")

module.exports = {
	/**
	 * 广播socket在线人数
	 */
	async logOnlineUsers() {
		// const maps = this.app.socketIdMaps
		const redis = this.app.redis
		const maps = await redis.hgetall("USER_SOCKET_MAP")
		this.logger("Online users", maps)
		setTimeout(() => {
			this.app.io.of("/").emit("onlineUsers", maps)
		}, 1000)
	},
	/**
	 * 处理数据格式
	 * @param {String} status 状态
	 * @param {String} msg 提示消息
	 * @param {Object} data 数据
	 */
	packData(status, msg, data) {
		return {
			status,
			msg,
			data
		}
	},
	logger
}
