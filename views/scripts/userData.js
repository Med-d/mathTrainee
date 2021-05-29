$(document).ready(() => {
  $.ajax({
    type: 'POST',
    contentType: 'json',
    url: '/choice'
  }).done((data) => {
    console.log(data)
    $('#user-login').html(data.login)
    $('#user-rate').html(data.rating)
  })
})
