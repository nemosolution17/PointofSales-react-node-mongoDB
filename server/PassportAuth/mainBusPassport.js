const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const MainUserLogin = require('../models/Authentication/userBusinessSchema');


module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, ( email, password, done) => {
        
        // Match email
        console.log("ree")
        console.log(email)
        MainUserLogin.findOne({email:email})
          .then(user =>{
              console.log(email)
              console.log(user)
              if (!user) {
                console.log("ree")
                return done(null, false, {message: "Email not registered"});
              }
              //match password
              else {
                console.log("oee")
                console.log(user.password)
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                  console.log(user.password);

                  if(err) throw err;

                  if(isMatch){
                    return done(null, user);
                  }
                  else{
                    return done(null, false, {message: 'Password is not correct'});
                  }
                });
              }
            });
          })
      );
      

    
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });
  
      // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      MainUserLogin.find({_id:id}).
          then(user =>{
            done(null, user);
          }).catch(error => console.log("there is issue"));
    });
};