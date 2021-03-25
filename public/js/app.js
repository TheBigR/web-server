console.log('Client side js file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log('error ' + data.error)
        } else {
          console.log('location: ' + data.location)
          console.log('forecast: ' + data.forecastData)
        }
      })
    },
  )
})
