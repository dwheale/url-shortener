const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const yup = require('yup')
const { nanoid } = require('nanoid')
require('dotenv').config()
require('./database')

const UrlModel = require('./url')

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

app.get('/url/:id', (req, res) => {
  // TODO: get info about the url
})

app.get('/:id', async (req, res) => {
  // TODO: redirect to url
  const { id: slug } = req.params
  try {
    const url = await UrlModel.findOne({ slug: slug })
    if (url) {
      res.redirect(url.url)
    }
    res.redirect(`/?error=${slug} not found`)
  } catch (error) {
    res.redirect(`/?error=Link not found`)
  }
})

const schema = yup.object().shape({
  slug: yup.string().trim().matches(/[\w\-]/i),
  url: yup.string().trim().url().required()
})

app.post('/url', async (req, res, next) => {
  let { slug, url } = req.body
  try {
    await schema.validate({
      slug,
      url
    })
    if(!slug) {
      slug = nanoid(6)
    } else {
      const existing = await UrlModel.findOne({ slug: slug })
      if (existing) {
        throw new Error('Slug in use.')
      }
    }
    slug = slug.toLowerCase()
    const newUrl = new UrlModel({
      url: url,
      slug: slug,
    })
    newUrl.save()
        .then(doc => {
          console.log(doc)
          res.json(doc)
        })
        .catch(err => {
          console.error(err)
        })

  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  if(error.status) {
    res.status(error.status)
  } else {
    res.status(500)
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  })
})

const port = process.env.PORT || 1300
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})