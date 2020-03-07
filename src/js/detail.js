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

//二级菜单上面
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

//拿到标识
const itemInfo = localStorage.getItem('item_info')
// 渲染title
$('.navBa h2').html(itemInfo)
$('.conRight>h1').html(itemInfo)
//拿数据
$.ajax({
	url: '../lib/json3.json',
	dataType: 'json',
	success: function(res) {
		// console.log(res)
		//遍历
		res.forEach((item) => {
			// console.log(item.img)
			if(item.title === itemInfo) {
				//渲染图片
				$('.contLeft').html(`<img src="${item.img}" alt="">`)
				//渲染价格
				$('.Price').html(`${item.price}元`)
				return
			}
		}) 
	}
})

// 添加购物车
$('.addShop a').on('click', () => {
	// e.preventDefault()
	$.ajax({
		url: '/shop',
		type: 'POST',
		dataType: 'json',
		data: {
			username: loginMessage.username,
			title : $('.navBa h2').text(),
			price : $('.Price').text(),
			img :$('.conLeft img').attr('src')
		},
		success: function(res) {
			if (res.code === 1) {
				console.log(res)
				window.location.href = './cart.html'
			} else {
				alert('添加失败')
			}
		},
		// error: function(res) {
		// 	window.location.href = './login.html'
		// }
	})
})

