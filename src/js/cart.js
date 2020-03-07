//计算小计和总价的钱，并渲染
function xiaoji() {
    let num = 0
    $('.col-total1').each(function() {
        $(this).text(
            $(this).siblings('.col-price1').text().replace(/[^0-9]/ig,'') * $(this).prev().find('input').val() + '元'
        )
        if($(this).siblings('.col-check').children().prop('checked')) {
            num += $(this).text().replace(/[^0-9]/ig,'') * 1
        }
    })
    //渲染总价
    $('.total-price>em').text(num)
}

//渲染件数
function jianshu() {
    let num = 0,
        sum = 0
    $('.check-dx').each(function() {
        let inpnum = $(this).parent().siblings('.col-num').find('input').val()*1
        sum += inpnum
        if($(this).prop('checked')) {
            let inpnum = $(this).parent().siblings('.col-num').find('input').val()*1
            num += inpnum
        }
    })
    $('#cartTotaNum').text(sum)
    $('#selTotaNum').text(num)
}
let arr = []
//总开关函数
function dack(json) {

    xiaoji()
    jianshu()        

    //绑定增加减少事件，和删除事件
    $('.item-box').find('.add-num').click(function() {
        let num = $(this).prev().val()*1+1
        if(num >= 99) num = 99
        $(this).prev().val(num)

        let title = $(this).parents('.col-num').siblings('.col-name').text()
        json.forEach(function(item) {
            if(title === item.title) {
                item.num = num
            }
        })
        sendData(json)
        // arr = json
        xiaoji()
        jianshu()
    }).siblings('.reduce-num').click(function() {
        let num = $(this).next().val()*1-1
        if(num <= 1) num = 1
        $(this).next().val(num)

        let title = $(this).parents('.col-num').siblings('.col-name').text()
        json.forEach(function(item) {
            if(title === item.title) {
                item.num = num
            }
        })
        sendData(json)

        xiaoji()
        jianshu()
    })
    //绑定删除事件
    $('.col-action>a').click(function() {
        $(this).parents('.item-box').hide(500, function() {
            $(this).remove()
            
            let title = $(this).find('.col-name').text()
            json.forEach(function(item, index) {
                if(title === item.title) {
                    json.splice(index, 1)
                }
            })
            sendData(json)
            xiaoji()
        })
        jianshu()
    })

    //全选按钮
    $('.check-qx').click(function() {
        $('.check-dx').prop('checked', this.checked)
        xiaoji()
        jianshu()
    })

    //复选按钮
    $('.check-dx').click(function() {
        let flag = true
        $('.check-dx').each(function() {
            if(!$(this).prop('checked')) flag = false
        })
        $('.check-qx').prop('checked', flag)
        xiaoji()
        jianshu()
    })

}


//渲染购物车
function applyCart(json) {
    let str = ''
    json.forEach((item) => {
        //渲染
        str += `<div class="item-box">
        <div class="item-table">
            <div class="col col-check fl">
                <input class="check-dx check-wd" type="checkbox">
            </div>
            <div class="col col-img fl"><img src="${item.img}" alt=""></div>
            <div class="col fl col-name">${item.title}</div>
            <div class="col col-price fl col-price1">${item.price_info}</div>
            <div class="col fl col-num">
                <div class="change-num">
                    <a class="reduce-num" href="javascript:;">-</a>
                    <input type="text" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="2" value="${item.num}" class="goods-num">
                    <a class="add-num" href="javascript:;">+</a>
                </div>
            </div>
            <div class="col fl col-total col-total1">${item.price_info}</div>
            <div class="col fl col-action"><a href="javascript:;">x</a></div>
        </div>
        
    </div>`
    })
    $('.list-body').html(str)
} 

//从数据库拿数据
function getcartData() {
    $.ajax({
        url: '/cart',
        type: 'POST',
        dataType: 'json',
        data: {username:username},
        success: function(res) {
            applyCart(res)
            dark(res)
        }
    })
}
getcartData()

//发送数据
function sendData(json) {
    $.ajax({
        url: '/send',
        type: 'POST',
        // dataType: 'json',
        data: {arr: JSON.stringify(json)},
        success: function(res) {
            if(res.code === 0) {
                alert('后台错误，请检查')
            }
        }
    })
}