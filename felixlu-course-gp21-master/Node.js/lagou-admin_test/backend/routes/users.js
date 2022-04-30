var express = require('express');
const {
  signup,
  list,
  remove,
  signin
} = require('../controllers/inde')
var router = express.Router();
// console.log(9000);
/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/list', list)

router.delete('/', remove)

router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;