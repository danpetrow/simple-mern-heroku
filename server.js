const express = require('express');
const session = require('express-session');
const connection = require('./model/db')


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

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const auth = require('./routes/auth')
const home = require('./routes/home')
const email = require('./routes/emailList')

app.use('/auth',auth)
app.use('/home',home)
app.use('/email',email)
//get and serve index.html
app.use(express.static('./public'))

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