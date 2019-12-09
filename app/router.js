/**
 * @Description: 路由映射
 * @Author: chenchen
 * @Date: 2019-08-29 15:09:52
 * @LastEditors: chenchen
 * @LastEditTime: 2019-12-09 17:43:42
 */
module.exports = app => {
	const { router, controller, io } = app
	router.get("/user", controller.user.getUsers)
	router.get("/login", controller.user.login)
	router.post("/regist", controller.user.regist)
	router.post("/:userid/uploadAvatar", controller.user.uploadAvatar)
	router.get("/getRecords", controller.chat.getRecords)

	// socketio路由
	io.of("/").route("chat", io.controller.chat.index)
}
