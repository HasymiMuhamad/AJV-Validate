const Post = require('../models/post');
const User = require('../models/user');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Ajv = require('ajv');
const mongoose = require('mongoose');
const memberValidate = require('../scheme/user');
var jwt = require('jsonwebtoken');
const userSchema = require('../scheme/user.json');
require('dotenv').config()



exports.userCreate = function(req, res, next){
    let user = new User(
        {
           // name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        });

        var ajv = new Ajv();
        const valid = ajv.validate(userSchema, user);

        if (valid){
            console.log('User is valid!');
            bcrypt.hash(user.password, saltRounds) .then(function(hash){
                user.password = hash
                user.save()
                .then(function() {
                    res.status(400).json({
                        body: user,
                    })
                })
                .catch((err) => {
                    res.send({ message : 'Data Invalid', error : err});
                });
            });
        } else{
            console.log('User data is invalid', validate.errors);
            res.status(400)
            res.send({ message : 'Data Invalid', error : validate.errors});

        }

}


exports.Test = function(req, res, next){
    res.json({message : "connection succes"});
    next();
}



exports.authentication = (req, res) =>{
    let user = new User
    user.then(() => {
        const payload = {
            id : user._id,
            username : user.username
        }

        const token = jwt.sign(payload, 'jwtsecret', {algorithm : 'HS256'});

        res.status(400).json({token : token,})
    })

    .then(function(req, res){
        bcrypt.compare(user.password, hash, function (err, res){
            if (res){
                res.json('compare password succes');
            } else {
                res.josn('compare password fail');
            }
        })
    })

    .catch((err)=>{
        res.json({message : 'Data invalid'});
    })

}

    

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, userNote) => {
     if (err) {
      return res.status(400).json({
       success: false,
       message: 'error'
      })
   
     } else {
      if (!userNote) {
       return res.status(400).json({
        message: 'User not found'
       })
      }
   
      bcrypt.compare(req.body.password, userNote.password)
       .then((valid) => {
        if (!valid) {
         return res.status(400).json({
          success: false,
          message: 'Wrong Password'
         })
        }
   
        const token = jwt.sign({ id: userNote._id }, 'jwtsecret', { expiresIn: '30d' })
        return res.status(200).json({
         success: true,
         message: token
        })
       })
       .catch(err => {
        return res.status(400).json({
         success: false,
         message: 'Password required to login'
        })
       })
     }
    })
   }




