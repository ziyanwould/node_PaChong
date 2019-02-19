//数据模型 建模
//categorys 数据表
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({

    name: {
        unique: true,
        type: String
    },
    movies: [{
        type: ObjectId,
        ref: 'Movie' //表的引用关系
    }],
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

categorySchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})
mongoose.model('Category', categorySchema)