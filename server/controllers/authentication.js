const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const config = require('../configs/config');
const async = require("async");
const gravatar = require("gravatar");
const passport = require("passport");
const User = require('../models/user');
const Spec = require('../models/spec');

/*
 ref:http://bcho.tistory.com/1083
 waterfall : 각자의 흐름이 의존성이 있을때 순차적으로 실행.
 series : 각자의 흐름이 의존성이 없을때 순차적으로 실행.
 parallel : 각자의 흐름이 의존성도 없으며, 순차적으로 실행될 필요도 없을때.
 */

/*
 import 명령어: mongoimport --db specker --collection specs --file init_spec.json
 export 명령어: mongoexport -d specker -c specs -o init_spec.json
 */

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


exports.getTag = function(req, res, next){

    let data = [];
    let query = '';
    if(req.body.keyword){
        query=req.body.keyword;
    }
    Spec.find({name : {$regex : query}, depth:"C"},function(err, datas){

        for(let i=0; i<datas.length; i++){
            data.push(datas[i].name);
        }

        console.log(data);
        res.send(data);
    });

    // db.terms.findOne({term : {$regex : "지수적"}})
};

exports.signIn = function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if(info!=undefined){
            res.json({result:info.code});
        } else {
            res.json({token:tokenForUser(user), user:user.public,result:"AUTH_USER"});
        }

    })(req, res, next);
};

exports.autoSignIn = function (req, res, next) {
    return res.json({token:tokenForUser(req.user), user:req.user.public, result:"AUTH_USER" });
}


exports.signUp = function(req, res, next){

    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    const sex = req.body.sex;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const tag = [];

    req.body.tag.map(({text})=>{
        tag.push(text);
    });

    const getGravatar = gravatar.url(email, {
        s: 80,
        d: 'retro'
    });

    const user = new User();
    user.public.email = email;
    user.private.password = password;
    user.public.age = age;
    user.public.sex = sex;
    user.public.name = name;
    user.private.phone = phone;

    user.public.address.placeId = address.placeId;
    user.public.address.label = address.label;
    user.public.address.location.lat = address.lat;
    user.public.address.location.lng = address.lng;
    user.public.gravatar = 'http:'+getGravatar;

    async.waterfall([
            function(callback){
                Spec.find({ name: { "$in" : tag}, depth:"C" }, function (err, specs) {
                    let initialScore=100;
                    console.log(specs);
                    specs.forEach(function(value){
                        if (user.public.goal.indexOf(value._id)==-1)
                            user.public.goal.push({tag:value._id, score:initialScore--});
                    });
                    callback(null, user);
                });
            }
        ],
        function(err, user){
            if(err) {
                throw err;
            }
            user.save(function(err){
                if(err){
                    return next(err);
                }
                return res.json({token:tokenForUser(user), user:user.public, result:"AUTH_USER" });
            })
        }
    );

    // db.terms.findOne({term : {$regex : "지수적"}})
};

