// http://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html

const AWS = require('aws-sdk')
const uuid = require('node-uuid')

const s3 = new AWS.S3({region: 'ap-northeast-2'})
const bucketName = 'node-sdk-sample-' + uuid.v4()
const keyName = 'hello_world.txt'

s3.createBucket({Bucket: bucketName}, _ => {
  let params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'}
  s3.putObject(params, (err, data) => {
    if (err) return console.error(err)
    console.log('Successfully uploaded data to ' + bucketName + '/' + keyName)
  })
})
