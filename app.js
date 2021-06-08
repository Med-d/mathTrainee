const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
const htmlView = require("./router.js")
const session = require("express-session")

const MongoStore = require("connect-mongo")

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://max:max041202@urfuproject.sgbf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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

app.use(
  session({
    secret: 'adsmvSCmkcdslSNVLvdsnvlsVSL',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: url,
      dbName: 'UsersDB'
    })
  })
)

app.get('/registration', async function(req, res){
  const login = req.query.login;
  const password = req.query.password;
  const passwordConfirm = req.query.confirm;
  console.log(login, password, passwordConfirm)
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

app.get('/login', (req, res) => {
  const login = req.query.login;
  const password = req.query.password;
  if(!login || !password){
    res.json({
      ok: false,
      error: "Все поля должны быть заполнены",
      fields: ['login', 'password']
    })
  } else {
    usersCollection.findOne({'login' : login})
      .then(user => {
        if(!user || password != user.password) {
          res.json({
            ok: false,
            error: "Логин и/или пароль неверны",
            fields: ['login', 'password']
          })
        } else {
          req.session.userId = user.Id
          req.session.userLogin = user.login
          res.json({
            ok: true
          })
        }
      })
      .catch()
  }
})

app.post('/choice', (req, res) => {
  const login = req.session.userLogin
  const id = req.session.userId
  console.log(login)
  usersCollection.findOne({'login' : login})
  .then(user => {
    res.json({
      login: login,
      rating: user.rating
    })
  })
})

app.use('/', htmlView)

app.listen(process.env.port || PORT, () => console.log("Server started work on port " + PORT))
