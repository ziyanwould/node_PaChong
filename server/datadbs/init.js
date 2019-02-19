const mongoose = require('mongoose');
const db = 'mongodb://www.yln212.top/douban-test';
const glob = require('glob');
const { resolve } = require('path');
mongoose.Promise = global.Promise;

//遍历数据模型加载进来
exports.initSchemas = () => {

    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(
        require)

}
exports.connect = () => {
    let maxConnectTime = 0;

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }

        mongoose.connect(db)

        mongoose.connection.on('disconnected', () => {
            maxConnectTime++
            if (maxConnectTime < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库挂了..........')
            }
        })
        mongoose.connection.once('error', err => {
            reject(err)
            console.log('MongoDB Connected false')
        })

        mongoose.connection.once('open', () => {

            //模板示例
            // const Dog = mongoose.model('Dog', { name: String })
            // const doga = new Dog({ name: '紫嫣would' })

            // doga.save().then(() => {
            //     console.log('wang')
            // })

            resolve()
            console.log('MongoDB Connected successful')
        })
    })
}