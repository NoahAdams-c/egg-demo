/**
 * @Description: 扩展工具函数
 * @Author: chenchen
 * @Date: 2019-10-28 12:43:52
 * @LastEditors: chenchen
 * @LastEditTime: 2019-10-29 22:33:39
 */
module.exports = {
	/**
	 * 广播socket在线人数
	 */
	logOnlineUsers() {
		const maps = this.app.socketIdMaps
		console.log(
			"\n====================ID - Socket Maps========================="
		)
		console.log(maps)
		console.log(
			"=============================================================\n"
		)
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
	}
}
