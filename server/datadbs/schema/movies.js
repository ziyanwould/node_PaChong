//数据模型 建模
//movies 数据表
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types

const movieSchema = new Schema({
    doubanId: {
        unique: true,
        type: String
    },
    category: [{
        type: ObjectId,
        ref: 'Category' //表的引用关系
    }],
    rate: Number, //评分
    title: String,
    summary: String, //简介
    video: String, //视频链接吗
    poster: String, //海报
    cover: String, //视频缩略图

    videoKey: String, //对应托管数据
    posterKey: String, //对应托管数据
    coverkey: String, //对应托管数据

    rawTitle: String, //英文的标题
    movieTypes: [String],
    pubdate: Mixed, //上应时间
    year: Number, //年份

    tags: [String], //标签

    meta: {
        createdAt: { //创建时间
            type: Date,
            default: Date.now()
        },
        updatedAt: { //更新时间
            type: Date,
            default: Date.now()
        }
    }

})

movieSchema.pre('save', function(next) {//中间件不能用箭头函数
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('Movie', movieSchema)