const Feed = require('../models/feed');
const cheerio = require('cheerio');
const async = require('async');
const User = require('../models/user');
const Spec = require('../models/spec');
const gravatar = require("gravatar");
const mongoose = require('mongoose');

exports.sendHomeFeed = function(req, res, next){

    // tag, mention 때네서 점수 대입 해야함. 추후 작업 예정
// 이미지 스트링을 실제 파일로 만들어 저장! 이부분 해결해보자

    let $ = cheerio.load(req.body.html.markup);


    async.waterfall([
        function (callback) {
            const feed = new Feed();
            feed.user._id = req.user._id;
            feed.user.name = req.user.public.name;
            feed.user.gravatar = req.user.public.gravatar;
            feed.content = req.body.html.markup;
            
            callback(null, feed);
        },
        function (feed, callback) {    // tag parsing

            let $tags = $('span.tag');
            for(let i=0; i<$tags.length; i++){
                feed.tag.push(mongoose.Types.ObjectId($tags[i].attribs.value));
            }
            callback(null, feed);
        },
        function (feed, callback) {    // mention parsing

            let $mentions = $('span.mention');
            for(let i=0; i<$mentions.length; i++){
                feed.mention.push(mongoose.Types.ObjectId($mentions[i].attribs.value));
            }
            callback(null, feed);
        },
        function (feed, callback) {
            let $img = $('img');


            if($img.length!=0){
                feed.thumb.img = $($img[0]).parent().html();

            }
            callback(null, feed);
        },
        function (feed, callback) {
            let $content = $('div.public-DraftStyleDefault-block');

            let content = '';
            let n=0, i=$content.length;

            while(i--){
                if(n>5){
                    break;
                }

                if($($content[n]).find('span[data-text="true"]').length){
                    if(feed.thumb.title===undefined){
                        // console.log("content",$($content[n]).find('span[data-text="true"]')[0].parent.name = 'h3');
                        $($content[n]).find('span[data-text="true"]')[0].parent.name = 'h4';
                        feed.thumb.title=$($content[n]).parent().html();
                    } else {
                        content+=$($content[n]).parent().html();
                    }
                    n++;
                }

            }
            feed.thumb.content = content;
            callback(null, feed);
        },
        function (feed, callback) {
            feed.save(function (err) {
                if(err)
                    return err;
                callback(null, feed);
            });

        },
        function (feed, callback) {
            for(let i=0; i<feed.tag.length; i++){
                let isExisted=false;
                req.user.public.goal.map( (j, x)=> {
                    if(feed.tag[i].toString()===j.tag.toString()){
                        req.user.public.goal[x].score+=5;
                        isExisted=true;
                    }

                });
                if(!isExisted){
                    req.user.public.goal.push({tag:feed.tag[i], score:5});
                }
            }

            User.findOneAndUpdate({ _id: req.user._id }, {"public.goal":req.user.public.goal}, { new: true }, function(err, user){
                if(err){
                    return next(err);
                }
                callback(null, feed);

            });
        }],
        function (err, result) {
            if(err){
                throw err;
            }

            res.json({result:"ok"});
        });




  



};

exports.getHomeFeed = function (req, res, next) {
    let query=Date.now();

    if(req.body.nextIndex!=""){
        query = new Date(req.body.nextIndex).toISOString();
    }


    Feed.find({date: {$lt: query}}).sort({date:-1}).limit(5).exec(function(err, data){
        if(err)
            throw err;
        const nextIndex = data.length==0?false:data[data.length-1].date;
        res.json({data, nextIndex })
    })
};




exports.getTags = function(req, res, next){
    let data = [];
    let query = '';
    if(req.body.keyword){
        query=req.body.keyword;
    }
    Spec.find({name : {$regex : query}, depth:"C"}).sort({name: 1}).limit(7).exec(function(err, datas){

        for(let i=0; i<datas.length; i++){
            const getGravatar = gravatar.url('joininspecker@gamil.com', {
                s: 40,
                d: 'retro'
            });

            data.push({
                name: datas[i].name,
                like: datas[i].like,
                _id: datas[i]._id,
                thumb: 'http:'+getGravatar,
            });
        }

        res.send(data);
    });
};



exports.getMentions = function (req, res, next) {

    // 자모음을 이용하여 소팅해야함.

};



exports.parser = function (html,user, callback) {



    // 1. mention 떼네기
    // 2. tag 떼네기
    // 3. main image 떼네기
    // 4. title 떼네기
    // 5. thumb content 떼네기


      tagParser(html, callback)
    // callback();
};


function mentionParser(html, callback) {
    let $ = cheerio.load(html);
    var data = $('span.mention');
    if(data.length!=0){
        callback();
    } else {
        callback();
    }
};

function tagParser(html, callback){
    let $ = cheerio.load(html);
    var data = $('span.tag');
    if(data.length!==0){
        callback();
    } else {
        callback();
    }
};

thumbParser = function(html, callback){
    let $ = cheerio.load(html);
    callback();
};

