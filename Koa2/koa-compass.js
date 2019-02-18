//纯函数是只有输入比如x改变 就一定会输出一个对应的y 不受外界影响 具有稳定性
// 例如：
//  function pur (x){
//      return x +1
//  }
// console.log(pur(1))
// console.log(pur(1))
// console.log(pur(1))
// console.log(pur(1))

// 不管调用多少次对应的值都不会变。


// 一种调用自身递归
//例如1

// function tail(i) {
//     if (i > 3) return
//     console.log('修改前 ' + i)
//         //调用自身
//     tail(i + 1)

//     console.log('修改后 ' + i)

// }

// tail(0)
// 结果：
// 修改前 0
// 修改前 1
// 修改前 2
// 修改前 3
// 修改后 3
// 修改后 2
// 修改后 1
// 修改后 0
//比较浪费性能 执行tail(2)又执行tail(1)

// 例如2 优化
// let tail = i => {
//     if (i > 3) return i
//     console.log('修改前', i)
//     return tail(i + 1)

// }
// tail(0);

// 结果：
// 修改前 0
// 修改前 1
// 修改前 2
// 修改前 3

//执行结果是下一次执行的入值