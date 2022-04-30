const http = require('http')
const url = require('url')
const logger = require('../../utils/log')

const server = http.createServer((req, res) => {
  let urlStr = req.url
  // logger.debug(urlStr)
  let urlObj = url.parse(urlStr, true)
  logger.debug(urlObj.query)
  switch (urlObj.pathname) {
    case '/api/data':
      // res.write('getData("hello222")')
      res.write(`${urlObj.query.cb}("hello")`)
      break;
    default:
      res.write('page not found.')
  }
  res.end()
})

server.listen(8080, () => {
  console.log('localhost:8080')
})