$(() => {
  $(".b5").on('click', (e) => {
    const data = { theme :  e.target.name }
    $.ajax({
      contentType: "json",
      data: data,
      url: '/soloTheme'
    }).done((data) => {
      if(!data.finded){
        alert("Все задания из этого раздела сделаны")
      } else {
        $.ajax({
          contentType : 'json',
          data: { task: data.task },
          url: '/putTask'
        })
        window.location.replace('/solo2')
      }
    })
  })
})
