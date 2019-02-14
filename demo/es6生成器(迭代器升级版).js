/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-02-14 16:19:02 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-14 16:33:35
 */
//快速console.log 'alt + -'
function* makeIterator(arr) {
    for (let i in arr) {

        yield arr[i]

    }
}

const gen = makeIterator(['吃饭', '睡觉', '打豆豆']);
// console.log('gen.next():', gen.next());  打印结果为 gen.next(): { value: '吃饭', done: false }
// 由此可见yield 帮我们构造好迭代器的使用

console.log('首先', gen.next().value)
console.log('然后', gen.next().value)
console.log('其次', gen.next().value)
console.log('最后', gen.next().done) //true 表示迭代完成