const passport = require('passport');
const mainLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            console.log(err) 
            return next(err); } 
        else {console.log("logged out")}
        res.redirect('/');
      });
}

module.exports = {mainLogout}