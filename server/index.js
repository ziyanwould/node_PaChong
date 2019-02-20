const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const mongoose = require('mongoose')
const { connect, initSchemas } = require('../server/datadbs/init');
const R = require('ramda');
const MIDDLEWARES = ['router']
const useMiddlewares = (app)=>{
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith=>initWith(app)
            ),
            require,
           name => resolve(__dirname,`./middlewares/${name}`) 
        )
    )(MIDDLEWARES)
   }
;(async() => {
    await connect()

    await initSchemas()

    const app = new Koa();
    await useMiddlewares(app)
    app.listen(3222)
})()


