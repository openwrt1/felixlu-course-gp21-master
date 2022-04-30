const logger = require('../utils/log')

// const querystring = require('querystring')
const {
  URLSearchParams
} = require('url');

const urlSearchParams = new URLSearchParams();
// id/2:name/tongyi:from/%E5%8C%97%E4%BA%AC

const query = 'id=2&name=tongyi&from=北京'
const query2 = 'id:2/name:tongyi/from:北京'
const queryEscape = 'id%3D2%26name%3Dtongyi%26from%3D%E5%8C%97%E4%BA%AC'
const queryObj = {
  id: '2',
  name: 'tongyi',
  from: '北京'
}

// logger.debug(urlSearchParams.parse(query))
// const params = new URLSearchParams(query);
// logger.debug(params)
// URLSearchParams { 'id' => '2', 'name' => 'tongyi', 'from' => '北京' }
// [Object: null prototype] { id: '2', name: 'tongyi', from: '北京' }
// const params = new URLSearchParams(query);
// logger.debug(params.toString())
// id=2&name=tongyi&from=%E5%8C%97%E4%BA%AC
// id%3D2%26name%3Dtongyi%26from%3D%E5%8C%97%E4%BA%AC
// logger.debug(URLSearchParams.unescape(queryEscape))
// id=2&name=tongyi&from=北京
// logger.debug(URLSearchParams.stringify(queryObj, ':', '/'))
// id/2:name/tongyi:from/%E5%8C%97%E4%BA%AC
// logger.debug(querystring.parse(query2, '/', ':'))
// const newQuery = URLSearchParams.stringify(queryObj, null, null, {
//   encodeURIComponent(string) {
//     return URLSearchParams.unescape(string)
//   }
// })
// logger.debug(newQuery)
// id=2&name=tongyi&from=北京