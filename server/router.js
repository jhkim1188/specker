const Authentication = require('./controllers/authentication');
const Home = require('./controllers/home');
const passport = require('passport');
const passportService = require('./services/passport');
const requireSignin = passport.authenticate('local');
const requireAuth = passport.authenticate('jwt', {session:false});


module.exports = function(app, io) {

    app.post('/signin', Authentication.signIn);
    app.post('/autoSignIn',requireAuth, Authentication.autoSignIn);
    app.post('/getTag', Authentication.getTag);


    app.post('/signUp', Authentication.signUp);
    app.post('/sendHomeFeed', requireAuth, Home.sendHomeFeed);
    app.post('/getHomeFeed', requireAuth, Home.getHomeFeed)

    app.post('/getMentions', requireAuth, Home.getMentions);
    app.post('/getTags', requireAuth, Home.getTags);

};
