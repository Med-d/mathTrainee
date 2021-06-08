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
      if(data.ok){
        window.location.replace("/")
      }
    })
  })
})
