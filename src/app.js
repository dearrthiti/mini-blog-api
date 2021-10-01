const express = require('express')
// to connect to the database
require('./db/mongoose')
const userRouter = require('./routers/user')
const userTask = require('./routers/card')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(userTask)

module.exports = app