import passport from 'passport';
import passportJWT from 'passport-jwt';
import { User } from '../entities/user.entity';

const { Strategy } = passportJWT;
const ExtractJWT = passportJWT.ExtractJwt;

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.find({ where: { id: payload.user.id } });
      if (!user) {
        return done(new Error('User not found'));
      }

      return done(null, user[0]);
    } catch (err) {
      return done(err);
    }
  })
);
