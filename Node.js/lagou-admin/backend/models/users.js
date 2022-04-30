const {
    Users
} = require('../utils/db')

const findUser = (username) => {
    return Users.findOne({
        username
    })
}


const signup = ({
    username,
    password
}) => {
    const users = new Users({
        username,
        password
    })
    const result = users.save()
    // console.log(result);
    return result
}

const findlist = () => {
    // console.log(Users.find());
    return Users.find().sort({
        _id: -1
    })
}
const delete_user_id = (id) => {
    return Users.findByIdAndRemove(id)
}
exports.signup = signup
exports.findUser = findUser
exports.findlist = findlist
exports.delete_user_id = delete_user_id