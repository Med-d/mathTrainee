$(() => {
  $('#login-button').on('click', (e) => {
    e.preventDefault()

    let data = {
      login: $('#login').val(),
      password: $('#password').val()
    }
    $.ajax({
      data: data,
      contentType: 'json',
      url: '/login'
    }).done((data) => {
      console.log(data)
      //TODO: сюда тебе надо написать что ты будешь делать с полями в случае если ok: false
    })
  })
})
