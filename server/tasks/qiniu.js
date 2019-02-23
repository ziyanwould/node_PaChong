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

var resUrl = 'http://vt1.doubanio.com/201902181308/ff3c9532ca58ec5d348e90c11e6b01b8/view/movie/M/402420330.mp4';
var bucket = "ziyanwould";
var key = "lldi.mp4";
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