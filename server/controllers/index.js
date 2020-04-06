const { User, Food } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const decode = require('../helpers/decode')

class Controller {
  static register(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(isFound) {
        next({status: 400, message: 'Email has been registered'})
      } else {
        return User.create({
          email,
          password
        })
      }
    })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(isFound) {
        return compare(password, isFound.password)
      } else {
        next({status: 404, message: 'Email not registered' })
      }
    })
    .then(result => {
      let access_token = jwt.sign({
        UserId: result.id,
        email: result.email
      }, process.env.SECRET)
      res.status(200).json({ access_token })
    })
    .catch(err => {
      next(err)
    })
  }

  static addFood(req, res, next) {
    let userData = decode(req.headers.access_token)
    let UserId = userData.UserId

    let { title, price, ingredients, tag } = req.body
    Food.create({
      title,
      price,
      ingredients,
      tag,
      UserId
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static getFoods(req, res, next) {
    let userData = decode(req.headers.access_token)
    let UserId = userData.UserId

    Food.findAll({
      where: { UserId }
    })
    .then(data => {
      res.status(200).json(data)
    })
  }

  static deleteFood(req, res, next) {
    let userData = decode(req.headers.access_token)
    let UserId = userData.UserId
    let id = req.params.id
    Food.destroy({
      where: { id }
    })
  }
}

module.exports = Controller