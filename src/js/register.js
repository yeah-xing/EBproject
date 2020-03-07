$('#btn').on('click', (e) => {
    e.preventDefault()
    // var username = $('#username').val()
    // var password = $('#password').val()
    $.ajax({
        url: '/register',
        type: 'POST',
        dataType: 'json',
        data: $('#login').serialize(),
        success: function (res) {
            if(res.code === 1) {
                window.location.href = './login.html'
            }else {
                $('.alert').addClass('login-show tada animated').children().html(res.message)
                $('#password').val('')
            }
        },
        error: function (res) {
            window.location.href = './register.html'
        }
    })
})