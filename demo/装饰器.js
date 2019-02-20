//由于现有node还不支持装饰器 需要babel来转译 start.js来启动编译成es5

class Boy {
    @speak('中文')
    run() {
        console.log('i can run!')
        console.log('i can speak ' + this.language)
    }
}

//demo1
// function speak(target, key, descriiptor) {
//     console.log(target) //所装饰的对象 打印是类
//     console.log(key) //所装饰的类方法名
//     console.log(descriiptor) //所装饰的描述
// }


//demo2 多传一个参数办法
function speak(language) {
    return function(target, key, descriiptor) {
        console.log(target) //所装饰的对象 打印是类
        console.log(key) //所装饰的类方法名
        console.log(descriiptor) //所装饰的描述

        target.language = language

        return descriiptor
    }
}
const ziyanwould = new Boy()

ziyanwould.run()