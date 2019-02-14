function makeIterator(arr) {
    let nextInder = 0
        //返回一个迭代器
    return {
        next: () => {
            //next() 方法返回的结果对象
            if (nextInder < arr.length) {
                return {
                    value: arr[nextInder++],
                    done: false
                }
            } else {
                return {
                    done: true //表示迭代完成
                }
            }
        }
    }
}

const it = makeIterator(["吃饭", "睡觉", "打豆豆"])
console.log('首先', it.next().value)
console.log('然后', it.next().value)
console.log('其次', it.next().value)
console.log('最后', it.next().done) //true 表示迭代完成


//迭代器总是有个next()方法 通过迭代总会拿到对象



// 生成器就是更加检疫使用迭代器 不用自己去构建