/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-11-09 04:21:53
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-02 18:04:39
 */
// server.js
const egg = require("egg")

// const workers = Number(process.argv[2] || require('os').cpus().length)
egg.startCluster({
	sticky: true,
	workers: 4,
	baseDir: __dirname,
	NODE_ENV: "dev"
})
// pm2 start server.js --name eyuai-open-api
