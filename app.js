const express = require('express');
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.ConnectString,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(bodyParser.json());
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')))


const Users = require('./Route/Users.route')
app.use ('/api/v1/User', Users)
const Book = require('./Route/Book.route')
app.use ('/api/v1/User/Book', Book)




module.exports = app; 


