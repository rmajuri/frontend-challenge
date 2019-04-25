require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//This send requests to /weather-api to the weather-api.js file
app.use('/weather-api', require('./weather-api'))
app.use('/indego-api', require('./indego-api'))
app.use('/assets', require('./assets'))

//This serves up the static files
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message)
})

module.exports = app
