const passport = require('passport');
const mainLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '',
        failureRedirect: '',
        failureFlash: true,
      }) (req, res, next) 
}

module.exports = {mainLogin}