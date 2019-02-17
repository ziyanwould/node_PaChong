const rp = require('request-promise-native');

async function fetchMovie(item) {

    const url = `http://api.douban.com/v2/movie/subject/${item.doubanid}`
    const res = await rp(url)

    return res
};
(async () => {
    let movies = [{
            doubanid: 26387939,
            title: '摔跤吧！爸爸',
            rate: 9,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2457983084.jpg'
        },
        {
            doubanid: 1889243,
            title: '星际穿越',
            rate: 9.2,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2206088801.jpg'
        }
    ]

    movies.map(async movie =>{
        let movieData = await fetchMovie(movie)
        movieData=JSON.parse(movieData)
        console.log(movieData)
    })
})()