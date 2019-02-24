const puppeteer = require('puppeteer');
const url =`https://movie.douban.com/tag/#/`;
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
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 1000*60*1
        })

        await sleep(1000)

        await page.waitForSelector('.more')
        for(let i=0;i<10;i++){
            await sleep(1000)
            await page.click('.more')
        }

        const result = await page.evaluate(()=>{
            var $ = window.$
            var items =$('.list-wp a')
            var links = []

            if(items.length>=1){
                items.each((index,item)=>{
                    let it  = $(item)
                    let doubanId = it.find('div').data('id')
                    let title = it.find('.title').text()
                    let rate = Number(it.find('.rate').text())
                    let poster = it.find('img').attr('src').replace('s_ratio','l_ratio')

                    links.push({
                        doubanId,
                        title,
                        rate,
                        poster
                    })
                })
            }
            return links
        })
        
        broowser.close()
        //console.log(result)

       //发送数据出去
       process.send({result})
       process.exit(0)
        
    })()
    