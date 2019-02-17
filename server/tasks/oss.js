let OSS = require('ali-oss');
let fs = require('fs');
let request = require('request');
let paths = require('path')
let co = require('co')

let client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIO3h4LpZkeLQw',
    accessKeySecret: 'a7AsVoz6jfKmGSRvORmZmkbuQdrlZk',
    bucket: 'ziyanwould'
});



const uoloadToOss = (url,name)=>{
    return new Promise((resolve,reject)=>{

        var userId = 'images';
        var timestamp = new Date().getTime();
        //var name = 'my.jpg';
        var path = paths.resolve(__dirname,'./img_tmp/')+'/'+userId+'_'+timestamp+'_'+name;
        var key = userId+'/'+timestamp+'_'+name;
        
        //获取远程文件，并以流写入文件
        // var url = 'https://www.ziyanwould.top/img/tm-img-02-tn.jpg';
        var stream = request(url).pipe(fs.createWriteStream(path));
        
         //流写入完毕
        stream.on("close", function () {
            co(function* () {
                var result = yield client.put(key, path);
                resolve(result);
               
            }).catch(function (err) {
                reject(err);
                
            });
        });
         
    })
}

;(async ()=>{
    let moves = [{
        video: 'http://vt1.doubanio.com/201902171940/cf54a989a9ead9cd53f559003595ace0/view/movie/M/402430147.mp4',
        doubanId: '26266893',
        cover: 'https://img3.doubanio.com/img/trailer/medium/2546089641.jpg?1548146239',
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2545472803.jpg'
    }]

    moves.map(async movie=>{
       
            try{
               await uoloadToOss(movie.video,'gg.mp4')
               await uoloadToOss(movie.cover,'player.png')
               await uoloadToOss(movie.poster,'hbao.png')

               console.log(00000)
            }catch(err){
                console.log(err)
            }
        
    })
})()