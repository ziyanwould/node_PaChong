const qiniu = require('qiniu')
const mongoose = require('mongoose')
const nanoid = require('nanoid')
const configs = require('./config')

let accessKey = configs.qinniu.AK;
let secretKey = configs.qinniu.Sk;
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
let bucketManager = new qiniu.rs.BucketManager(mac, config);

const Movie = mongoose.model('Movie')
var bucket = "ziyanwould";
const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
  
      bucketManager.fetch(url, bucket, key, function(err, respBody, respInfo) {
      if (err) {
        reject(err)
      }
      else {
        if (respInfo.statusCode === 200) {
          resolve({ key })
        } else {
          reject(respInfo)
        }
      }
    })
  })
}

;(async () => {
  let movies = await Movie.find({
    $or: [
      {videoKey: {$exists: false}},
      {videoKey: null},
      {videoKey: ''}
    ]
  }).exec()


  for (let i = 0; i < movies.length; i++) {
     
     let movie = movies[i]

    if (movie.video && !movie.videoKey) {
        //console.log('movies',movie)
      try {
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

        console.log('videoData',videoData)
        console.log('movie',movie)

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        await movie.save()
      } catch (err) {
        console.log('err',err)
      }
    }
  }
})()
