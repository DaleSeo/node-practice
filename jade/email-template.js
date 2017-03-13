const jade = require('jade')

const data = {
  title: 'Hello, Customer!',
  author: {
    twitter: '@DaleSeo',
    name: 'Dale Seo'
  },
  tags: ['node', 'jade', 'express'],
  By: 'abcde'
}

data.body = process.argv[2]

jade.renderFile('email-template.jade', data, (err, html) => {
  if (err) throw err
  console.log(html)
})
