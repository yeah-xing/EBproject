$('#btn').on('click', e => {
	e.preventDefault()
	// var username = $('#username').val()
	// var password = $('#password').val()
	$.ajax({
		url: '/login',
		type: 'POST',
		dataType: 'json',
		data: $('#login').serialize(),
		success: function(res) {
			if (res.code === 1) {
				console.log(res)
				document.cookie = `username=${res.username}`
				window.location.href = './index.html'
			} else {
				$('.alert')
					.addClass('loginShow tada animated')
					.children()
					.html(res.message)
				$('#password').val('')
			}
		},
		error: function(res) {
			window.location.href = './login.html'
		}
	})
})
