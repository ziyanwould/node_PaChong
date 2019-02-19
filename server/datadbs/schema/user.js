//数据模型 建模
//user 数据表
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
        username: {
            unique: true, //数据唯一性 有重复会报错
            required: true, //这个值一定要有
            type: String,
        },
        email: {
            unique: true, //数据唯一性 有重复会报错
            required: true, //这个值一定要有
            type: String,
        },
        password: {
            unique: true, //数据唯一性 有重复会报错
            type: String,
        },
        loginAttempts: {
            type: Number,
            required: true,
            default: 0
        }, //尝试登陆的次数
        lockUntil: Number, //账号锁定时间
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
    //建立一个虚拟的值看是否账号锁定 且不存在数据库
userSchema.virtual('isLocked').get(() => {
    return !!(this.lockUntil && lockUntil > Date.now()) //对齐取反 判断账号是否被锁定 锁定时间是否超过指定时间 返回布尔值
})

//对密码加密(加盐)
userSchema.pre('save', next => {
    if (!this.isModified('password')) return next() //密码没有修改 返回
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (error, hash) => { //salt 盐值 越高越浪费性能 影响并发
            if (err) {
                return next(error);
            }
            this.password = hash;
            next();
        })
    });

    next()
})

userSchema.pre('save', next => {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

//判断密码是否一致 是否存在风险登录（连续几次账号密码错误）
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => { //isMatch 表示的是比较的结果 返回 布尔值 true false 
                if (!err) resolve(isMatch)
                else reject(err)

            })
        })
    },

    //账号是否超过登录次数进行锁定  如果过了登录限制时间 解锁当做第一次登录
    incLoginAttepts: (user) => {
        return new Promise((resolve, reject) => {
            if (this.lockUntil && this.lockUntil < Date.now()) {
                this.update({
                    $set: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }, (err) => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            } else {
                let updates = {
                    $inc: {
                        loginAttempts: 1
                    }
                }

                if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
                    updates.$set = {
                        lockUntil: Date.now() + LOCK_TIME ////被锁住时间
                    }
                }

                this.update(updates, err => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            }
        })
    }
}

mongoose.model('User', userSchema)