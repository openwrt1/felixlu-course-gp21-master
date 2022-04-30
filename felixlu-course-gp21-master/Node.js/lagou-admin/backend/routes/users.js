var express = require('express');
const {
  signup,
  list,
  remove,
  signin,
  signout,
  isAuth
} = require('../controllers/inde')
const {
  auth
} = require('../middlewares/auth')


var router = express.Router();
// console.log(9000);
/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/list', auth, list)

router.delete('/', auth, remove)

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', auth, signout);
router.get('/isAuth', isAuth);





module.exports = router;