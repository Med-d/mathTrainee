const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
const htmlView = require("./router.js")
const mongoose = require('mongoose')


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://max:max041202@urfuproject.sgbf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
  try {
        await client.connect()
        console.log("Connected correctly to server")
    } catch (err) {
        console.log(err.stack)
    }
    finally {
        await client.close()
    }
}
run().catch(console.dir)
const db = client.UserDB
const usersCollection = db.Users

const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.engine('html', require('ejs').renderFile);

app.post('/reg', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const passwordConfirm = req.body.confirm;
  if(!login || !password || !passwordConfirm){
    res.json({
      ok: false,
      error: "Все поля должны быть заполнены",
      fields: ['login', 'password', 'confirm']
    })
  } else if(password != passwordConfirm) {
    res.json({
      ok: false,
      error: "Пароли должны совпадать",
      fields: ['password', 'confirm']
    })
  } else if(login.length < 3 || login.length > 12){
    res.json({
      ok: false,
      error: "Длина логина должна быть от 3 до 12 символов",
      fields: ['login']
    })
  } else if (usersCollection.find({'login': login})) {
    res.json({
      ok: false,
      error: "Этот логин занят. Выберите другой",
      fields: ['login']
    })
  } else {
    usersCollection.insert({
      login: login,
      password: password
    })
    res.json({
      ok: true
    })
  }
})

app.post('/', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  if(!usersCollection.find({login: login})){
    res.json({
      ok: false,
      error: 'Такого логина не существует',
      fields: ['login']
    })
  } else if(usersCollection.find({login: login})['password'] != password) {
    res.json({
      ok: false,
      error: 'Неверный пароль',
      fields: ['password']
    })
  } else {
    res.json({
      ok: true
    })
  }
})

app.use('/', htmlView)

app.listen(process.env.port || PORT, () => console.log("Server started work on port " + PORT))
