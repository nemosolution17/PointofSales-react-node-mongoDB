const { application } = require('express')
require("dotenv").config({path: "/home/naheem/Documents/LayanAppWithGit/server/routes/.env"})
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const indexRoutes = require('./routes/index')
var passport = require('passport');
var session = require('express-session');
require('./PassportAuth/mainBusPassport')(passport);

app.use(express.json())

// Express session

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
require('./PassportAuth/mainBusPassport')(passport);

mongoose.connect(process.env.MONG_URI)
    .then(()=>{
  
    })
    .catch((error)=>{
        console.log(error)
    })

app.use('/', indexRoutes)




app.listen(process.env.PORT, () => (console.log("server started at port 5000")))