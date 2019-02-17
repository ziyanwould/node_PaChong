const puppeteer = require('puppeteer');
const base = `https://movie.douban.com/subject//`;
const doubanId = '26266893'
const videoBase = 'https://movie.douban.com/trailer/242330/'
const sleep = time => new Promise(resolve => {
        setTimeout(resolve, time)
    });
    (async () => {
        console.log('start visit thetarget page')

        const broowser = await puppeteer.launch({
            args: ['--no-sandbox'],
            dumpio: false
        })
        const page = await broowser.newPage()
        await page.goto(base + doubanId, {
            waitUntil: 'networkidle2'
        })

        await sleep(100)

       
        

        const result = await page.evaluate(()=>{
            var $ = window.$
            var it = $('.related-pic-video')
            
            if(it && it.length>0){
                var link = it.attr('href')
                var cover = it.attr('style')
                   cover = cover.substring(21)
                   cover = cover.substr(0,cover.length-1)
            
                return{
                    link,
                    cover
                }
            }


           

     
            return {}
        })
        

        let video
        if(result.link){
            await page.goto(result.link,{
                waitUntil:'networkidle2'
            })
            await sleep(200)

            video = await page.evaluate(()=>{
                var $ = window.$
                var it = $('source')

                if(it && it.length >0){
                    return it.attr('src')
                }
                return ''
            })
        }
        const data = {
            video,
            doubanId,
            cover:result.cover
        }
        broowser.close()
       // console.log(result)

       //发送数据出去
       process.send(data)
       process.exit(0)
        
    })()
    