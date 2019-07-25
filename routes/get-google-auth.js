/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { signToken } = require('../utils/authToken');
const postgres = require('../config/postgres');
const suggestedUsernames = require('../utils/suggestedUsernames');

const register = async ({ email, profilePicture, verified }) => {
    const usernames = suggestedUsernames({
        username: email.split('@')[0],
        maxLength: 16,
    });

    for (const username of usernames) {
        const res2 = await postgres.query('select 1 from Users where username = $1', [username]);
        const usernameTaken = res2.rowCount > 0;

        if (!usernameTaken) {
            await postgres.query(`
                insert into Users(username, email, profile_picture, verified, has_google_auth)
                values($1, $2, $3, true)
            `, [username, email, profilePicture, verified]);

            return {
                email,
                username,
                profilePicture,
                verified,
            };
        }
    }
};

const login = async (google, db) => {
    const fields = `
        ${!db.has_google_auth ? 'has_google_auth = true,' : ''}
        ${google.profilePicture && !db.profile_picture ? 'profile_picture = $1,' : ''}
        ${google.verified && !db.verified ? 'verified = true,' : ''}
    `.trim().slice(0, -1);

    delete db.has_google_auth;

    const shouldUpdate = !!fields.replace(/[ \r\n]/g, '');

    if (!shouldUpdate) {
        return db;
    }

    await postgres.query(`
        update Users
        set ${fields}
        where username = $2
    `, [google.profilePicture, db.username]);

    return {
        ...db,
        profilePicture: db.profile_picture || google.profilePicture,
        verified: db.verified || google.verified,
    };
};

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://127.0.0.1:5000/google-auth/callback',
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const { emails, photos } = profile;
            const data = {
                email: emails[0].value,
                verified: emails[0].verified,
                profilePicture: photos[0].value,
            };

            const res1 = await postgres.query(` 
                select
                    username,
                    email,
                    password,
                    verified,
                    bio,
                    phone,
                    profile_picture,
                    has_google_auth
                from Users
                where email = $1
            `, [data.email]);

            const isRegistered = res1.rowCount > 0;

            try {
                const user = await (isRegistered ? login(data, res1.rows[0]) : register(data));

                cb(null, user);
            } catch (e) {
                console.log(e);
                // TODO: handle errors
            }
        },
    ),
);

module.exports = app => {
    app.get('/google-auth', (...args) => {
        const [req] = args;

        return passport.authenticate('google', { scope: ['email', 'profile'], state: req.query.returnUrl })(...args);
    });
    app.get('/google-auth/callback', passport.authenticate('google'), (req, res) => {
        const returnUrl = req.query.state;

        console.log(req.user);
        res.redirect(`${returnUrl}?token=${signToken(req.user)}`);
    });
};
