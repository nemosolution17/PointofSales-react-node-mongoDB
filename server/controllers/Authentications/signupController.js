const MainUserLogin = require('../../models/Authentication/userBusinessSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require("nodemailer")


// sign up for new business
const signUpBusiness = (req, res) => {
    const {businessName, email,password,address,city,state,country,phoneNumber,userRole} = req.body

    console.log("here me")
    MainUserLogin.find({email:email}).
        then(user =>{
         
            if (user.length > 0 ) {
                console.log("we reg")
                res.send("userRegistered")
            }
            else {
                console.log(343)
                async.waterfall([
                    function(done) {
                        crypto.randomBytes(30, (err, buff)=> {
                            var token = buff.toString('hex');
                           
                            done(err, token)
                        });
                    },

                    function(token, done){
                        console.log(password)
                        
                        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err
                            console.log(hash)

                            let password = hash
                            console.log(password)
                            try{
                                const signup = MainUserLogin.create({businessName, email,password,address,city,state,country,phoneNumber,userRole, token})
                                res.status(200).json(signup)
                            } catch(error){
                                res.status(400).json({error: error.message})
                            }

                            done(err, token)

                        }))
                    }
                    /*
                    function(token, done) {

                        var smtpTransport = nodemailer.createTransport({
                            service: 'Gmail', 
                            auth: {
                                user: 'tunjimikel@gmail.com',
                                pass: 'Bestlayan@17'
  
                            }
                        });
                        var mailOptions = {
                            to: email,
                            from: 'tunjimikel@gmail.com',
                            subject: 'PartiFest Email Confirmation',
                            text: 'You are receiving this because you just register for an account with us.\n\n' +
                              'Please click on the following link, or paste this into your browser to confirm your email:\n\n' +
                              'http://' + req.headers.host + '/confirm/' + token + '\n\n' +
                              'Thanks.\n'
                        };

                        smtpTransport.sendMail(mailOptions, function (err, res) {
                            if (err) {
                                console.log(err)
                            } else{
                                console.log("email sent")
                            }
                        });
                          
                    } */
                ])
            }
        })
}

module.exports = {signUpBusiness}

// sign up for new business
/*
const signUpBusiness = async (req, res, next) => {
    const {businessName, email,password,address,city,state,country,phoneNumber,userRole} = req.body


    try{
        const signup = await userBusinessSchema.create({businessName, email,password,address,city,state,country,phoneNumber,userRole})
        res.send(state)
        res.status(200).json(signup)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signUpBusiness}*/