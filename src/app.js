const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))

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
    message: 'This comes to help with your weather.',
  })
})

app.get('/weather', (req, res) => {
  res.send({ temp: 20, feelsLike: 23 })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
