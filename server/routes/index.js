const router = require('express').Router()
const Controller = require('../controllers')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
router.get('/', (req, res) => {
  res.send('Test OK!')
})

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authenticate)

router.post('/foods', Controller.addFood)
router.get('/foods', Controller.getFoods)
router.delete('/delete/:id',authorization, Controller.deleteFood)

module.exports = router