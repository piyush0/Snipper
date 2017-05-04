/**
 * Created by piyush0 on 04/05/17.
 */
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

const db = require('./mongohandler');
const config = require('./config.json');
const secrets = require('./secrets.json')
module.exports = passport.use(new FacebookStrategy({
        clientID: secrets.FB_CLIENT_ID,
        clientSecret: secrets.FB_CLIENT_SECRET,
        callbackURL: config.SERVER_URL + config.FACEBOOK_CALLBACK
    },
    function (accessToken, refreshToken, profile, done) {

        db.findUserByOauth(profile.id, function (user) {
            if (user !== null) {
                done(null, user);
            } else {
                let user = {
                    name: profile.displayName,
                    created: Date.now(),
                    oauthId: profile.id
                };

                db.insertUser(user, function (result) {
                    done(null, user);
                })
            }
        });


    }
));

passport.use(new GithubStrategy({
        clientID: secrets.GITHUB_CONSUMER_KEY,
        clientSecret: secrets.GITHUB_CONSUMER_SECRET,
        callbackURL: config.SERVER_URL + config.GITHUB_CALLBACK
    },
    function (accessToken, refreshToken, profile, done) {

        db.findUserByOauth(profile.id, function (user) {
            if (user !== null) {
                done(null, user);
            } else {
                let user = {
                    name: profile.displayName,
                    created: Date.now(),
                    oauthId: profile.id
                };

                db.insertUser(user, function (result) {
                    done(null, user);
                })
            }
        });

    }
));
