const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config.
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Roy Nevo',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Roy Nevo',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Roy Nevo',
    message: 'This comes to help with your weather.',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided!!',
    })
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          location,
          forecastData,
          address: req.query.address,
        })
      })
    },
  )
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Roy Nevo',
    message: 'No such help topic!',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Roy Nevo',
    message: 'Error - Page not found.',
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
