const express = require('express')
const path = require('path');
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

//Serve React Frontend
app.use(express.static(path.join(__dirname, 'client/build')));
 app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
 });
//Serve Nodejs Frontend
//app.use(express.static('./public'))

//import javascript to use for routes -> 
const auth = require('./routes/auth')
const home = require('./routes/home')
const email = require('./routes/emailList')
const register = require('./routes/register')
const user = require('./routes/user')
const product = require('./routes/product')
const cart = require('./routes/cart')
const order = require('./routes/order')
const api = require('./routes/api')
//assign routes to url
app.use('/login',auth)
app.use('/home',home)
app.use('/email',email)
app.use('/register',register)
app.use('/api/users', user)
app.use('/api/products',product)
app.use('/api/carts',cart)
app.use('/api/orders',order)
app.use('/api',api)
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