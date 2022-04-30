// import indexTpl from '../views/index.art'
// import {
//   auth as authModel
// } from '../models/auth'
// import pageHeader from '../components/pageheader'

// import page from '../databus/page'

// import img from '../assets/user2-160x160.jpg'

// const index = (router) => {
//   return async (req, res, next) => {
//     let result = await authModel()
//     if (result.ret) {
//       const html = indexTpl({
//         subRouter: res.subRoute(),
//         img
//       })

//       // 渲染首页
//       next(html)

//       // window resize, 让页面撑满整个屏幕
//       $(window, '.wrapper').resize()

//       // 加载页面导航
//       pageHeader()

//       const $as = $('#sidebar-menu li:not(:first-child) a')
//       let hash = location.hash
//       $as
//         .filter(`[href="${hash}"]`)
//         .parent()
//         .addClass('active')
//         .siblings()
//         .removeClass('active')

//       // 是否重置page
//       if (hash !== page.curRoute) {
//         page.reset()
//       }

//       // 当前url保存
//       page.setCurRoute(hash)

//       // 登出事件绑定
//       $('#users-signout').off('click').on('click', (e) => {
//         e.preventDefault()
//         localStorage.setItem('lg-token', '')
//         location.reload()
//       })

//       // socket
//       var socket = io.connect('http://localhost:3000')

//       socket.on('message', function (msg) {
//         let num = ~~$('#icon-email').text()
//         $('#icon-email').text(++num)
//       })

//     } else {
//       router.go('/signin')
//     }
//   }
// }

// export default index

import signinTpl from '../views/signin.art'
import indexTpl from '../views/index.art'
import usersTpl from '../views/users.art'
import users_list_tpl from '../views/users-list.art'
import users_pagesTpl from '../views/users-pages.art'
import router from '../routes/index'


const htmlsignin = signinTpl({})
const htmlIndex = indexTpl({})

const page_max_size = 5
let total_data = null
let isfirst = true
let currertPage = 1


const _handSubmit = (router) => {
  return (e) => {
    e.preventDefault()

    const data1 = $("#signin").serialize()
    if (data1) {

    }
    console.log(data1)
    $.ajax({
      url: '/api/users/signin',
      type: 'post',
      data: data1,
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (data.ret) {
          router.go('/index')
        } else {
          alert("用户名或者密码不对")
        }
      }
    })



  }
}




const signup = () => {
  const $btnclose = $('#users-close')

  const data1 = $("#user-form").serialize()

  // console.log(data1)
  $.ajax({
    url: '/api/users/signup',
    type: 'post',
    data: data1,
    success: function (data) {
      console.log(data);
      _list(1)
    }
  })


  $btnclose.trigger('click')
}

const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlsignin)

    $('#signin').on('submit', _handSubmit(router))



  }
}
const _page_data = (page, pageArray) => {
  let start = (page - 1) * page_max_size + 1 - 1
  // debugger
  let end = page * page_max_size
  let result_arr = pageArray.slice(start, end)
  // console.log(result_arr);
  return result_arr
}
const _page_color = (page) => {

  let string1 = ".box-footer li:nth-child(" + (page + 1) + ")"
  $(string1).addClass('active').siblings().removeClass('active')
}


const _pagenation = (data) => {

  const total_data_length1 = data.length
  const pagecount = Math.ceil(total_data_length1 / page_max_size)
  // console.log(pagecount);
  const pageArray = Array.from(data)
  const page_aray_list = new Array(pagecount)
  // console.log(page_aray_list);

  const html_page = users_pagesTpl({
    page_aray_list
  })
  $('#box_footer1').html(html_page)

  if (isfirst) {
    $('#users-page-list li:nth-child(2)').addClass('active')
    isfirst = false
  }





  // console.log(total_data);
  // console.log(pagecount);
  // console.log(pageArray);

}
const _render_list = (total_data, page) => {

  const arr_list = _page_data(page, total_data)
  _page_color(page)
  $('#users-list').html(users_list_tpl({
    data: arr_list
  }));


}

const _list = (pageno) => {
  console.log("进入list一次");
  return new Promise(function (resolve, reject) {
    console.log('当前传进来的是' + pageno);

    $.ajax({
      url: '/api/users/list',
      // type: 'get',
      // data: datatemp,
      dataType: 'json', //这个地方是问题的关键所在

      success: function (result, textStatus) {
        //data可能是xmlDoc、jsonObj、html、text等等


        const arr_list = _page_data(pageno, result.data)
        $('#users-list').html(users_list_tpl({
          data: arr_list
        }));

        total_data = Array.from(result.data)
        _pagenation(result.data);


        _page_color(pageno)

        currertPage = pageno


        $('#users-page-list li:not(:first-child,:last-child)').off('click')
        $('#users-page-list li:not(:first-child,:last-child)').on('click', function () {
          $(this).addClass('active').siblings().removeClass('active')
          _list($(this).index())
        })
        $('#box_footer1').off('click', '#users-page-list li:first-child')
        $('#box_footer1').on('click', '#users-page-list li:first-child', function () {
          if (currertPage > 1) {
            // debugger
            _list(currertPage - 1)
          }
          //console.log(currertPage);
        })
        $('#box_footer1').off('click', '#users-page-list li:last-child')
        $('#box_footer1').on('click', '#users-page-list li:last-child', function () {
          // console.log($(this).index());
          // $(this).index();
          if (currertPage < Math.ceil(total_data.length / page_max_size)) {
            // debugger
            _list(currertPage + 1)
          }
          //console.log(currertPage);
        })

        resolve(result.data)
        this; //调用本次ajax请求时传递的options参数
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        //通常情况下textStatus和errorThrown只有其中一个包含信息
        console.log(textStatus);
        console.log(errorThrown);
        this; //调用本次ajax请求时传递的options参数
        reject(errorThrown)
      }
    })
  })


}
const _bindEnevt = (issuccess) => {
  //弄个登出功能
  $('#signout').on('click', (e) => {
    // console.log(100);
    e.preventDefault()
    $.ajax({
      url: '/api/users/signout',
      dataType: 'json',
      success: (params) => {
        if (params.ret) {
          location.reload()
        } else {
          alert("登出失败")
        }
      }
    })

  })
  //绑定删除事件

  $('#users-list').on('click', '.remove', function () {
    $.ajax({
      url: '/api/users',
      type: 'delete',
      data: {
        id: $(this).data('id')
      },
      success: () => {
        issuccess = true;
        if (issuccess) {
          _list(1)
        }
      }
    })
  })
  //添加用户操作
  $('#users-save').on('click', signup)
}

const index = (router) => {
  const index_main = (res) => {
    res.render(htmlIndex)

    $(window, '.wrapper').resize()

    // let user = usersTpl()
    // console.log($('.content'))
    $('#content').html(usersTpl())

    let issuccess = false;
    _bindEnevt(issuccess)

    //渲染用户列表
    if (issuccess == false) {
      console.log("issuccess==false");
      _list(1)
    }
  }
  return (req, res, next) => {

    $.ajax({
      url: '/api/users/isAuth',
      dataType: 'json',
      success: (params) => {
        if (params.ret) {
          index_main(res)
        } else {
          console.log("没有权限进入")
        }
      }
    })




  }


}

export {
  signin,
  index
}