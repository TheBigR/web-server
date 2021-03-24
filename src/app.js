const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
  res.send({ temp: 20, feelsLike: 23 })
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

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
