const Bundler = require('parcel-bundler')  //开发环境下由KOA2 提供的静态文件的访问能力
const views = require('koa-views')
const server = require('koa-static')
const { resolve } = require('path')
const r = path => resolve(__dirname,path)

const bundler = new Bundler(r('../../../src/index.html'),{
     publicUrl:'/',
     watch:true
})

export const dev = async app =>{
    await bundler.bundle()

    app.use(server(r('../../../dist')))
    app.use(views(r('../../../dist')),{
        extension:'html'
    })

    app.use(async (ctx) =>{
        await ctx.render('index.html')
    })
}
