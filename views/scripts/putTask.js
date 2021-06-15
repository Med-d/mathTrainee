function SetNewTask() {
  $.ajax({
    url: '/getTask'
  }).done(data => {
    const task = data.task
    let taskDiv = document.getElementById('task')
    let taskNameDiv = document.getElementById('taskName')
    taskDiv.innerHTML = task.task
    taskNameDiv.innerHTML = task.taskName
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, taskDiv])
  })
}

$(document).ready(SetNewTask())

$(() => {
  $("#button-sendAnswer").on('click', (e) => {
    e.preventDefault()
    const answer = $('#answer').val()
    const taskName = document.getElementById('taskName').innerHTML
    data = {
      answer: answer,
      taskName: taskName
    }
    $.ajax({
      contentType: 'json',
      data: data,
      url: '/checkAnswer'
    }).done(data => {
      if(!data.ok){
        alert('Неверный ответ')
      } else {
        $.ajax({
          contentType: "json",
          data: {theme: data.theme},
          url: '/soloTheme'
        }).done((data) => {
          if(!data.finded){
            alert("Все задания из этого раздела сделаны")
          } else {
            $.ajax({
              contentType : 'json',
              data: { task: data.task },
              url: '/putTask'
            }).done(data => {
              SetNewTask()
            })
          }
        })
      }
    })
  })
})
