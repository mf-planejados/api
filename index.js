require('dotenv').config()
const express = require('express')
const routes = require('./src/routes')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
// const port = process.env.PORT || 3000

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', routes)

mongoose.connect(process.env.MONGODB_URL).
    then(() => {
        app.listen(process.env.PORT || '3000')
        console.log('Conectado ao banco...')
    })
    .catch((err) => console.log(err))