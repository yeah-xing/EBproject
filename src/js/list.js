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



//json排序，
//type,根据什么排序
// asc：默认降序，true为升, default 不排序
function mysortData(json, type, asc) {
	json.sort(function(a, b) {
		if(asc === 'default') {
			return json
		}
		if(!asc) {
			return b[type] - a[type]
		}else {
			return a[type] - b[type]
		}
	})
	return json
}


//封装渲染数据
function applyData(json) {
	let str = ''
	json.forEach(item => {
		// console.log(item)
		str += `<div class="goodsItem" data-id="${item.title}">
		<div class="figure">
			<img src="${item.img}" alt="">
		</div>
		<h2>${item.title}</h2>
		<p>${item.price}元</p>
		<a href="javascript:;">
			<span>加入购物车</span>
			<i class="iconfont icon-jiarugouwuche"></i>
		</a>
	</div>`
	})
	$('.goodsList').html(str)
}

//封装拿数据
function get(asc) {
	$.ajax({
		url: '../lib/json3.json',
		dataType: 'json',
		success: function(res) {
			//先排好序，tem为排好序的json
			let tem = mysortData(res, 'price', asc)
			//渲染前20条数据
			applyData(tem.slice(0, 20))

			//渲染分页器
			$("#page").paging({
				nowPage: 1, // 当前页码,默认为1
				pageNum: Math.ceil(tem.length / 20), // 总页码
				// buttonNum: 3, //要展示的页码数量，默认为7，若小于5则为5
				callback: function(num) { //回调函数,num为当前页码
					// console.log(num)
					//根据页码渲染数据
					let list = tem.slice((num - 1) * 20, num * 20)
					// console.log(list)
					applyData(list)
				}
			});
		}
	})
}


get('default')

//点击升序排列
$('.price-up').click(function() {
	$(this).css('color', '#ff6700').parent().siblings().children('a').css('color', '#424242')
	get(true)
})
// 点击降序
$('.price-down').click(function() {
	$(this).css('color', '#ff6700').parent().siblings().children('a').css('color', '#424242')
	get(false)
})
//点击默认
$('.price-default').click(function() {
	$(this).css('color', '#ff6700').parent().siblings().children('a').css('color', '#424242')
	get('default')
})

//点击翻页页面滚到列表的头部
//	因为加载页面的时候分页器还没有加载进来，所有把这个功能放进了分页器公共函数

// console.log($('.content').offset().top)
// $('#page>ul').on('click', 'li', function() {
// 	$('html, body').animate({scrollTop: $('.content').offset().top}, 'slow')
// })


//事件委托存数据
$('.goodsList').on('click', '.goodsItem', function() {
	// console.log($(this).data('id'))
	//把拿到的id放到locaStorage
	localStorage.setItem('item_info', $(this).data('id'))
	window.location.href = './detail.html'
})


//渲染小购物车
applyLitterCart()