let OSS = require('ali-oss');
let fs = require('fs');
var request = require('request');
let paths = require('path')
let co = require('co')

let client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIO3h4LpZkeLQw',
    accessKeySecret: 'a7AsVoz6jfKmGSRvORmZmkbuQdrlZk',
    bucket: 'ziyanwould'
});

var userId = 'images';
var timestamp = new Date().getTime();
var name = 'my.mp4';
var path = paths.resolve(__dirname,'./img_tmp/')+'/'+userId+'_'+timestamp+'_'+name;
var key = userId+'/'+timestamp+'_'+name;

//获取远程文件，并以流写入文件
var url = 'http://vt1.doubanio.com/201902171406/535f2fb259eeb3f40c000a6484d974e7/view/movie/M/402420330.mp4';
var stream = request(url).pipe(fs.createWriteStream(path));

 //流写入完毕
stream.on('finish', function () {
    co(function* () {
        var result = yield client.put(key, path);
        console.log(result);
       
    }).catch(function (err) {
        console.log(err);
    });
});
