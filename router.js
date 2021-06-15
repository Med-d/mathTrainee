const express = require("express")
const router = express.Router()

router.get('/', (req, res) =>{
  if(req.session.userLogin){
    res.redirect('/choice')
    return
  }
  res.render('index.ejs')
})
router.get('/choice', (req, res) => {
  res.render('choice.ejs')
})
router.get('/reg', (req, res) => {
  if(req.session.userLogin){
    res.redirect('/choice')
    return
  }
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

module.exports = router;
