const express = require('express')
const session = require('express-session')
const connection = require('./model/db')
const cors = require('cors')
const bodyParser = require('body-parser')

//database but here
// const mysql = require("mysql");
// require('dotenv').config()

// const connection = mysql.createPool({
//   host: process.env.host,
//   user: process.env.user,
//   password: process.env.password,
//   database: process.env.db
// });

const app = express();

app.use(bodyParser.json())

app.use(session({
	secret: 'the-super-strong-secrect',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routers
app.use(express.static('./public'))

const login = require('./routes/login')
const home = require('./routes/home')
const email = require('./routes/emailList')
const register = require('./routes/register')

app.use('/login',login)
app.use('/home',home)
app.use('/email',email)
app.use('/register',register)

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