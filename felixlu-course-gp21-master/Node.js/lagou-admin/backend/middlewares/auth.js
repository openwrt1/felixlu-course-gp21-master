const auth = (req, res, next) => {
    if (req.session.username) {
        next()
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名COOK没有,请登陆'
            })
        })
    }
}

exports.auth = auth