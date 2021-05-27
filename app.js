const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
const htmlView = require("./router.js")
const mongoose = require('mongoose')


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://max:max041202@urfuproject.sgbf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let usersCollection
let db
async function run(){
  try {
        await client.connect()
        console.log("Connected correctly to server")

        db = client.db('UsersDB')
        usersCollection = db.collection('Users')

    } catch (err) {
        console.log(err.stack)
    }
}
run().catch(console.dir)

const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.engine('html', require('ejs').renderFile);

app.get('/registration', async function(req, res){
  const login = req.query.login;
  const password = req.query.password;
  const passwordConfirm = req.query.confirm;
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
  } else if (await usersCollection.findOne({'login': login})) {
    res.json({
      ok: false,
      error: "Этот логин занят. Выберите другой",
      fields: ['login']
    })
  } else {
    usersCollection.insertOne({
      login: login,
      password: password,
      rating: 0
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
