let mongoose = require('mongoose')

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`${ process.env.MONGO_URL }/url-shortener`, {
      auth: {
        user: process.env.MONGO_DB_USER,
        password: process.env.MONGO_DB_PASSWORD,
        database: process.env.MONGO_DB_AUTH_DB
      },
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
        .then(() => {
          console.log('Database connection successful')
        })
        .catch(err => {
          console.error('Database connection error', err)
        })
  }

}

module.exports = new Database()