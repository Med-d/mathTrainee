$(() => {
  $('#registration-button').on('click', (e) => {
    e.preventDefault()

    let data = {
      login: $('#login').val(),
      password: $('#password').val(),
      confirm: $('#confirm').val()
    }

    $.ajax({
      data: data,
      contentType: 'json',
      url: '/registration'
    }).done((data) => {
      console.log(data)
      //TODO: сюда тебе надо написать что ты будешь делать с полями в случае если ok: false
    })
  })
})
