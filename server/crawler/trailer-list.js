const puppeteer = require('puppeteer')

// const url = `https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=%E7%94%B5%E5%BD%B1,%E6%BE%B3%E5%A4%A7%E5%88%A9%E4%BA%9A`
const url =`https://movie.douban.com/tag/#/`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 1000*60*2
  })

  await sleep(1000)

  await page.waitForSelector('.more')

  for (let i = 0; i < 15; i++) {
    await sleep(1000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a')
    var links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('.title').text()
        let rate = Number(it.find('.rate').text())
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
        console.log( doubanId,
          title,
          rate,
          poster)
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
  console.log("result初始",result)
  browser.close()

  process.send({result})
  process.exit(0)
})()
