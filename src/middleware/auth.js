import {find} from '../services/users';

require('dotenv').config();
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');

const strategy = new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await find({id: jwtPayload.id});
        if (!user) {
          const err = new Error('User not found');
          err.statusCode = 404;
          throw err;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    },
);
passport.use(strategy);
const initialize = () => {
  return passport.initialize();
};
const authenticate = () => {
  return passport.authenticate('jwt', {session: false});
};
module.exports = {
  initialize,
  authenticate,
};
