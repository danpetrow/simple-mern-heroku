require('dotenv').config()

const host=process.env.host
const user = process.env.user
const password = process.env.password
const db = process.env.db

module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: password,
    DB: db
  };