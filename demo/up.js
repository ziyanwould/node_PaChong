const OSS = require('ali-oss');
const fs = require('fs');


let client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIO3h4LpZkeLQw',
    accessKeySecret: 'a7AsVoz6jfKmGSRvORmZmkbuQdrlZk',

  
});
client.useBucket('ziyanwould');

//本地文件上传
async function put() {
    try {
        let result = await client.put('images/ceshi5.mp4', '../402420330.mp4');
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

put()

// async function putStream () {
//     try {
//     // use 'chunked encoding'
//     let stream = fs.createReadStream('../402420330.mp4');
//     let result = await client.putStream('object-name.mp4', stream);
//     console.log(result);
  
//     // don't use 'chunked encoding'
//     // let stream = fs.createReadStream('local-file');
//     // let size = fs.statSync('local-file').size;
//     // let result = await client.putStream(
//     //   'object-name', stream, {contentLength: size});
//     // console.log(result);
//     } catch (e) {
//       console.log(e)
//     }
//   }
  
//   putStream();
