//点击退出登录删除cookie，回到登录页
$('.quit-login').click(() => quitLogin())

//小米闪购时间
function shandian() {
	var myDate = new Date()
	$('#hours').html(
		myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
	)
	$('#minute').html(
		myDate.getMinutes() < 10
			? '0' + myDate.getMinutes()
			: myDate.getMinutes()
	)
	$('#second').html(
		myDate.getSeconds() < 10
			? '0' + myDate.getSeconds()
			: myDate.getSeconds()
	)
}
setInterval(shandian, 1000)
//商品导航
$('.content .conLeft li,.conList').mouseenter(() => {
	$('.conList').css('display', 'block')
})
$('.content .conLeft li,.conList').mouseleave(() => {
	$('.conList').css('display', 'none')
})
//轮播图
var mySwiper1 = new Swiper('.swiper-container1', {
	loop: true, // 循环模式选项
	autoplay: true,

	// 如果需要分页器
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	effect: 'fade',

	// 如果需要前进后退按钮
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})
var mySwiper2 = new Swiper('.swiper-container2', {
	navigation: {
		nextEl: '.swiper-button-next2',
		prevEl: '.swiper-button-prev2'
	}
})

//下载app效果
$('.liQrc')
	.mouseenter(() => {
		$('.liQrc .QRC')
			.stop()
			.slideDown(200)
	})
	.mouseleave(() => {
		$('.liQrc .QRC')
			.stop()
			.slideUp(200)
	})

//购物车效果
$('.shop')
	.mouseenter(() => {
		$('.shop .shop-h')
			.stop()
			.slideDown(200)
	})
	.mouseleave(() => {
		$('.shop .shop-h')
			.stop()
			.slideUp(200)
	})

//上边导航
$.ajax({
	url: '../lib/json1.json',
	dataType: 'json',
	success: function(res) {
		let str = ''
		res.forEach(element => {
			str += `<li>${element.name}</li>`
		})
		$('.navTopT')
			.html(str)
			.on({
				mouseenter: () =>
					$('.navMenuOne')
						.stop()
						.slideDown(),
				mouseleave: () =>
					$('.navMenuOne')
						.stop()
						.slideUp()
			})
			.children('li')
			.on('mouseover', function() {
				let index = $(this).index()
				let list = res[index].list
				let str = ''
				list.forEach(element => {
					str += `<li>
				<div><img src="${element.list_url}" alt=""></div>
				<p>${element.list_name}</p>
				<span>${element.list_price}元</span>
			</li>`
				})
				$('.navMenuOne ul').html(str)
			})
		$('.navMenuOne').on({
			mouseover: function() {
				$(this)
					.stop()
					.slideDown()
			},
			mouseout: function() {
				$(this)
					.stop()
					.slideUp()
			}
		})
	}
})

//左侧导航
$.ajax({
	url: '../lib/json2.json',
	dataType: 'json',
	success: function(res) {
		$('.conLeft>a>ul>li').on('mouseover', function() {
			let list = res[$(this).index()].list,
				str1 = '',
				str2 = '',
				str3 = '',
				str4 = '',
				i = 0
			list.forEach(res => {
				i++
				if (i <= 6) {
					str1 += `<li><img src="${res.src}" alt=""><span>${res.title}</span></li>`
				}
				if (i > 6 && i <= 12) {
					str2 += `<li><img src="${res.src}" alt=""><span>${res.title}</span></li>`
				}
				if (i > 12 && i <= 18) {
					str3 += `<li><img src="${res.src}" alt=""><span>${res.title}</span></li>`
				}
				if (i > 18) {
					str4 += `<li><img src="${res.src}" alt=""><span>${res.title}</span></li>`
				}
			})
			if (str3 !== '') str3 = `<ul>${str3}</ul>`
			if (str4 !== '') {
				str4 = `<ul>${str4}</ul>`
				$('.conList').css('width', '992px')
			} else {
				$('.contList').css('width', '')
			}
			let str = `<ul>${str1}</ul><ul>${str2}</ul>${str3}${str4}`
			$('.conList > a').html(str)
		})
	}
})
