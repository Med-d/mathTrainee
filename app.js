const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.engine('html', require('ejs').renderFile);

router.get('/', (req, res) =>{
  res.render('index.ejs')
})
router.get('/choice', (req, res) => {
  res.render('choice.ejs')
})
router.get('/reg', (req, res) => {
  res.render('reg.ejs')
})
router.get('/solo', (req, res) => {
  res.render('solo.ejs')
})
router.get('/solo2', (req, res) => {
  res.render('solo2.ejs')
})
router.get('/tour', (req, res) => {
  res.render('tour.ejs')
})

app.use('/', router)

app.listen(process.env.port || PORT, () => console.log("Server started work on port " + PORT))
