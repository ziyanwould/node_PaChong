const Router = require('koa-router')
const { resolve } = require('path')
const symbolPrefix = Symbol('prefix')
const _ = require('lodash')
const glob = require('glob')
const routerMap = new Map()
const isArray = c => _.isArray(c) ? c : [c]

export class Route {
    constructor(app, apiPath) {
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }
    init() {
        glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

        for (let [conf, controller] of routerMap) {
            const controllers = isArray(controller)
            const prefixPath = conf.target[symbolPrefix]
            if (prefixPath) prefixPath = normalizePath(prefixPath)
            const routerPath = prefixPath + conf.path
            this.router[conf.method](routerPath, ...controllers)
        }

        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}
//查看是否根路径 如果不是 下一层
const normalizePath = path => path.startsWith('/') ? path : `/${path}`
const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path)

    routerMap.set({
        target: target,
        ...conf
    }, target[key])
}

export const controller = path => target => (target.prototype[symbolPrefix] = path)

export const get = path => router({
    method: 'get',
    path: path
})

export const post = path => router({ //表单等
    method: 'post',
    path: path
})

export const put = path => router({ //修改一条已有目录
    method: 'put',
    path: path
})

export const del = path => router({ //删除一条已有目录
    method: 'del',
    path: path
})

export const use = path => router({ //使用中间件
    method: 'use',
    path: path
})


export const all = path => router({ //处理所有请求
    method: 'all',
    path: path
})