const usersModel = require('../models/users')
var randomstring = require('randomstring')
const {
    hash,
    comparison
} = require('../utils/tools')
// console.log(30000);
const signin = async (req, res, next) => {
    const {
        username,
        password
    } = req.body

    

    let findresult = await usersModel.findUser(username)
    if (findresult == false) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名不存在。'
            })
        })
    } else {
        // let hashresult = await usersModel.findUser(password)
        let {
            password: hash
        } = findresult
        console.log(findresult);
        // console.log(password)
        // console.log(hash);
        let comparReturn = await comparison(password, hash)
        if (comparReturn) {


            const sessionID = randomstring.generate();
            res.set('Set-Cookie', `sessionID=${sessionID};Path=/;HttpOnly`)
            res.set('content-type', 'application/json;charset=utf-8')

            res.render('succ', {
                data: JSON.stringify({
                    message: '登陆成功'
                })
            })




        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '密码错误'
                })
            })
        }

    }


}
const signup = async (req, res, next) => {

    const {
        username,
        password
    } = req.body


    res.set('content-type', 'application/json;charset=utf-8')

    const bcryptPassword = await hash(password)
    // console.log(bcryptPassword);
    let findresult = await usersModel.findUser(username)
    // console.log(findresult);
    if (findresult) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名存在。'
            })
        })
    } else {
        let result = await usersModel.signup({
            username,
            password: bcryptPassword
        })
        // console.log(result);
        res.render('succ', {
            data: JSON.stringify({
                username,
                password,
                message: '注册成功'
            })
        })

    }
}
//这是登陆功能
//这是获取用户列表
const list = async (req, res, next) => {
    // console.log(10000);
    res.set('content-type', 'application/json;charset=utf-8')

    const listResult = await usersModel.findlist()
    res.render('succ', {
        data: JSON.stringify(listResult)
    })


    // console.log(listResult);
}
//这是删除用户数据
const remove = async (req, res, next) => {
    // console.log(10000);
    res.set('content-type', 'application/json;charset=utf-8')


    const remove_id = req.body
    console.log(remove_id);
    const listResult = await usersModel.delete_user_id(remove_id)
    if (listResult) {
        res.render('succ', {
            data: JSON.stringify({
                message: "指定的用户数据已删除"
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: "删除数据失败"
            })
        })
    }



    // console.log(listResult);
}


exports.signup = signup
exports.list = list
exports.remove = remove
exports.signin = signin