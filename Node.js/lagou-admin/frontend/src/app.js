// 载入css
import './assets/common.css'

// 载入路由
import router from './routes'
// console.log(router)

$.ajax({
    url: 'api/users/isAuth',
    type: 'get',
    dataType: 'json',
    success: (result) => {
        if (result.ret) {
            console.log("有权限登陆");
            router.go('/index')
        } else {
            console.log(result)
            router.go('/signin')
        }
    }
})
// router.go('/')