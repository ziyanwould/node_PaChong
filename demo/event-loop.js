const {readFile,readFileSync} = require('fs');
setImmediate(()=> console.log('[阶段3 setImmediate 回调1]'))
setImmediate(()=> console.log('[阶段3 setImmediate 回调2]'))
setImmediate(()=> console.log('[阶段3 setImmediate 回调3]'))

Promise.resolve().then(()=>{
    console.log('[。。。待切入下一状态 ] promise 回调1')
    setImmediate(()=> console.log('[阶段3 setImmediate ] promise 回调1 增加的 immediate 回调4'))
})

readFile('../package.json','utf-8',data=>{
    console.log('阶段2 。。。 Io回调] 读文件 回调1')

    readFile('../11.mp4','utf-8',data=>{
        console.log('阶段2 。。。 Io回调] 读文件 回调2')
       
        setImmediate(()=>{
            console.log('[阶段3 setImmediate ]读写 回调2 增加的 immediate 回调5')  
            Promise.resolve().then(()=>{
                console.log('[。。。待切入下一状态 ] promise 回调2')
                process.nextTick(()=> console.log('[。。。待切入下一状态 ] promise 回调2 增加的 nextTick 回调5'))
            }).then(()=>{
                console.log('[。。。待切入下一状态 ] promise 回调3')
            })

        } )
        setImmediate(()=>{
            console.log('[阶段3 setImmediate ]读写 回调2 增加的 immediate 回调6')  
      
            process.nextTick(()=>{
                console.log('[...待切入下一状态] setImmediate 回调6 增加的 process.nextTick回调6')
                console.log('[...待切入下一状态] 这块正在同步阻塞的读个大文件')
                const video = readFileSync('../11.mp4','utf-8')
                process.nextTick(()=> console.log('[....待切入下一个阶段] immediate 回调5 增加的 nexttick 回调7'))

                readFile('../package.json','utf-8',data =>{
                    console.log('[阶段2.。。。 IO回调] 读文件回调2')

                    setImmediate(()=>{
                        console.log('[阶段3 setImmediate ]读写 回调2 增加的 immediate 回调8') 

                        setTimeout(()=>{
                            console.log('[阶段一 。。。定时器] 定时器 回调8')
                        })
                    }) 
                    setTimeout(()=> console.log('阶段1 。。。 定时器] 定时器 回调8'),0 )
                    setTimeout(()=> console.log('阶段1 。。。 定时器] 定时器 回调9'),0 )

                })
            })
        } )
    })

    setImmediate(()=> console.log('[阶段3 setImmediate 回调4]'))
})

setTimeout(()=> console.log('阶段1 。。。 定时器] 定时器 回调1'),0 )
setTimeout(()=>{
    console.log('阶段1 。。。 定时器] 定时器 回调5')
    process.nextTick(()=>{
        console.log('[...待切入下一状态] process.nextTick回调2')
    })
})
setTimeout(()=> console.log('阶段1 。。。 定时器] 定时器 回调3'),0 )
setTimeout(()=> console.log('阶段1 。。。 定时器] 定时器 回调4'),0 )

process.nextTick(()=>{console.log('[...待切入下一状态] process.nextTick回调1')})
process.nextTick(()=>{
    console.log('[...待切入下一状态] process.nextTick回调2')
    process.nextTick(()=>{console.log('[...待切入下一状态] process.nextTick回调4')})
})

process.nextTick(()=>{console.log('[...待切入下一状态] process.nextTick回调3')})