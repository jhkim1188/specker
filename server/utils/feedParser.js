const cheerio = require('cheerio');
const async = require('async');





exports.parser = function (html, callback) {

    console.log(html);
    // 1. mention 떼네기
    // 2. tag 떼네기
    // 3. main image 떼네기
    // 4. title 떼네기
    // 5. thumb content 떼네기


    callback();
};


mentionParser = function (html, callback) {
    let $ = cheerio.load(html);
    var data = $('span.mention');
    if(data.length!=0){
        callback();
    } else {
        callback();
    }
};

tagParser = function(html, callback){
    let $ = cheerio.load(html);

    callback();
};

thumbParser = function(html, callback){
    let $ = cheerio.load(html);
    callback();
};

