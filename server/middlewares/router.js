//初始化整个路由的中间层
const { Router } = require('../lib/decorator')
const { resolve } = require('path')

export const router = app => {
    const apiPath = resolve(__dirname, '../routes')
    const router = new Router(app, apiPath)
    router.init()
}