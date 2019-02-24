const qiniu = require('qiniu');
const naooid = require('nanoid')
const configs = require('./config')

let accessKey = configs.qinniu.AK;
let secretKey = configs.qinniu.Sk;
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
let bucketManager = new qiniu.rs.BucketManager(mac, config);

var resUrl = 'https://img1.doubanio.com/img/trailer/medium/2536760239.jpg?';
var bucket = "ziyanwould";
var key = "ziyanwould.png";
bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
    if (err) {
        console.log('err', err);
        //throw err;
    } else {
        if (respInfo.statusCode == 200) {
            console.log(respBody.key);
            console.log(respBody.hash);
            console.log(respBody.fsize);
            console.log(respBody.mimeType);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    }
});