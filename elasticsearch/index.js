const bonsai_url = process.env.BONSAI_URL;
const elasticserach = require('elasticsearch');
const client = new elasticserach.Client({
  host: bonsai_url,
  log: 'trace'
})

client.ping({
  requestTimeout: 30000,
  hello: 'elasticserach'
}, (err) => {
  if (err) {
    console.error('elasticsearch cluster is down!')
  } else [
    console.log('All is well')
  ]
})
