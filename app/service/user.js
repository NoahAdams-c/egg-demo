/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-08-29 16:42:49
 * @LastEditors: chenchen
 * @LastEditTime: 2019-12-09 18:26:27
 */
const Service = require("egg").Service

const fs = require("fs")
const Path = require("path")
const sendToWormhole = require("stream-wormhole")
const promisify = require("util").promisify

const mkdir = promisify(fs.mkdir)

class UserService extends Service {
	/**
	 * 	查询全部用户
	 * @param {Number} page_size 单页记录数
	 * @param {Number} current_page 当前页码
	 */
	async searchAll(page_size, current_page) {
		const ctx = this.ctx
		let query = {
			limit: page_size,
			offset: page_size * (current_page - 1)
		}
		let data = await ctx.model.User.findAndCountAll(query)
		return {
			data
		}
	}

	/**
	 * 通过用户名查询指定用户
	 * @param {String} user_id 用户名
	 */
	async searchByUserId(user_id) {
		const ctx = this.ctx
		let query = {
			where: {
				user_id
			}
		}
		let data = await ctx.model.User.findOne(query)
		return data ? data.dataValues : null
	}

	/**
	 * 查询用户是否已存在
	 * @param {String} user_id
	 */
	async isUserExist(user_id) {
		let data = await this.searchByUserId(user_id)
		return !!data
	}

	/**
	 * 插入新用户数据
	 * @param {String} user_id 用户名
	 * @param {String} password 密码
	 * @param {String} nick_name 昵称
	 */
	async insertNewUser(user_id, password, nick_name) {
		const ctx = this.ctx
		let now = new Date()
		let row = {
			user_id,
			password,
			nick_name,
			created_at: now,
			updated_at: now
		}
		let result = ctx.model.User.create(row)
		console.log(result)
		return result
	}

	/**
	 * 更新头像
	 * @param {String} userid 用户id
	 * @param {FileStream} stream 文件流
	 */
	async updateAvatar(userid, stream) {
		const { ctx } = this
		let fileName = `avatar_${new Date().getTime()}${Path.extname(
			stream.filename
		)}`
		let targetDir = Path.join("./", "app/public/avatar/", userid)
		// 如果不存在目录创建目录
		await mkdir(targetDir).catch(err => {})
		let target = Path.join(targetDir, fileName)
		const path = await new Promise((resolve, reject) => {
			const remoteFileStream = fs.createWriteStream(target)
			stream.pipe(remoteFileStream)
			let errFlag = false
			// 监听错误
			remoteFileStream.on("error", err => {
				errFlag = true
				// 停止写入
				sendToWormhole(stream)
				remoteFileStream.destroy()
				console.log("\n" + err + "\n")
				reject("")
			})
			// 监听完成
			remoteFileStream.on("finish", () => {
				if (errFlag) {
					return
				}
				resolve(target.replace("app", ""))
			})
		})
		if (path) {
			await ctx.model.User.update(
				{
					avatar: path
				},
				{
					where: {
						user_id: userid
					}
				}
			)
		}
		return { path }
	}
}

module.exports = UserService
