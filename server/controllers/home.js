const Feed = require('../models/feed');
const FeedParser = require('../utils/feedParser');

exports.sendHomeFeed = function(req, res, next){

    // tag, mention 때네서 점수 대입 해야함. 추후 작업 예정
// 이미지 스트링을 실제 파일로 만들어 저장! 이부분 해결해보자

    FeedParser.parser(req.body.html, function () {
        const feed = new Feed();
        feed.user._id = req.user._id;
        feed.user.name = req.user.public.name;
        feed.user.gravatar = req.user.public.gravatar;
        feed.content = req.body.html;

        feed.save(function (err) {
            if(err)
                return err;
            res.json({result:"ok"});
        });
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



exports.temo = function (req, res, next) {
    async.waterfall([
            function(callback){
                const $html =req.body.html;
                Parser.parser($html[0].children, req.user._id, function(result){
                    callback(null, result);
                });

            },
            function(content, callback){
                const feed = new Feed();
                feed.user._id = req.user._id;
                feed.user.name = req.user.public.name;
                feed.user.gravatar = req.user.public.gravatar;
                feed.content = content.content;
                feed.title = req.body.title;

                for(var i=0; i<content.mention.length; i++){
                    feed.mention.push(mongoose.Types.ObjectId(content.mention[i]));
                }
                for(var i=0; i<content.tag.length; i++){
                    feed.tag.push(mongoose.Types.ObjectId(content.tag[i]));
                }

                feed.save(function (err) {
                    if(err)
                        return err;
                    callback(null, feed);

                });


            },
            function(feed, callback){
                for(var i=0; i<feed.tag.length; i++){
                    var isExisted=false;
                    req.user.public.goal.map( (j, x)=> {
                        if(feed.tag[i].toString()==j.tag.toString()){
                            req.user.public.goal[x].score+=5;
                            console.log(req.user.public.goal[x]);
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


            }
        ],
        function(err, result){
            if(err) {
                throw err;
            }
            return res.status(200).send(result);
            // return res.status(200).send({ userInfo: user.public, token: tokenForUser(user), userStatus:"AUTH_USER" });

        });
}
