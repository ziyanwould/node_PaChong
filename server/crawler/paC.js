const puppeteer = require('puppeteer');
const url = `https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=`;
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
            waitUntil: 'networkidle2'
        })

        await sleep(1000)

        await page.waitForSelector('.more')
        for(let i=0;i<1;i++){
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
                    let doubanid = it.find('div').data('id')
                    let title = it.find('.title').text()
                    let rate = Number(it.find('.rate').text())
                    let poster = it.find('img').attr('src').replace('s_ratio','l_ratio')

                    links.push({
                        doubanid,
                        title,
                        rate,
                        poster
                    })
                })
            }
            return links
        })
        
        broowser.close()
       // console.log(result)

       //发送数据出去
       process.send({result})
       process.exit(0)
        
    })()
    