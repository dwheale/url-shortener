const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

app.use(helmet())

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('tiny'))
} else {
  app.use(morgan('combined'))
}

app.use(cors())
app.use(express.json())

app.use(express.static('./public'))

// app.get('/url/:id', (req, res) => {
//   // TODO: get info about the url
// })
//
// app.get('/:id', (req, res) => {
//   // TODO: redirect to url
// })
//
// app.post('/url', (req, res) => {
//   // TODO: create a short url
// })

const port = process.env.PORT || 1300
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})