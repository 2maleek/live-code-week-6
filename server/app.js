require('dotenv').config()

const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 4000
const app = express()