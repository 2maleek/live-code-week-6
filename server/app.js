require('dotenv').config()

const express = require('express')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: false } ))
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Server Running on PORT '+ port)
})