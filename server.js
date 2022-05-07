const express = require('express')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

//database but here
//const connection = require('./model/db')
// const mysql = require("mysql");
// const connection = mysql.createPool({
//   host: process.env.host,
//   user: process.env.user,
//   password: process.env.password,
//   database: process.env.db
// });

const app = express();

//app config
app.use(bodyParser.json())
app.use(session({
	secret: process.env.secret,
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./public'))

//import javascript to use for routes -> 
const login = require('./routes/login')
const home = require('./routes/home')
const email = require('./routes/emailList')
const register = require('./routes/register')
const user = require('./routes/user')
//assign routes to url
app.use('/login',login)
app.use('/home',home)
app.use('/email',email)
app.use('/register',register)
app.use('/api/users', user)

//handle errors
app.all('*',(req,res)=>{
  res.status(404).send('looks like this page doesnt exist')
  res.end
  })  

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});