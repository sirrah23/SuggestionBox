const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()
const dbURL = process.env.DB_URL
const port = process.env.PORT

mongoose.connect(dbURL)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))