const jwt = require('jsonwebtoken');
const { Food } = require('../models')
const decode = require('../helpers/decode')
 
module.exports = (req,res,next) => {
  let id = Number(req.params.id)
  const userData = decode(req.headers.access_token)
  Food.findOne({
    where: {
      id
    }
  })
  .then(data => {
    if(!data){
      next({
        status:404,
        message:'Food not found'
      })
    }else{
      if(Number(userData.id) === Number(data.userId)){
        next()
      }else{
        next({
          status:401,
          message:'Forbidden Access'
        })
      } 
    }
  })
  .catch(err => {
    next(err)
  })
}