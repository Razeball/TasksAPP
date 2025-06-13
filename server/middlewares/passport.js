import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import env from "../config.js";
import user from "../models/userModel.js";

//passport option, extract the token from the header and then assign the key
const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

//make the new strategy
passport.use(
  new JwtStrategy(opt, async (jwt_payload, done) => {
    try {
      //search for the user using the payload in the token
      const foundUser = await user.findOne({
        where: { id: jwt_payload.id },
      });
      //If it is found return the user
      if (foundUser) {
        return done(null, foundUser);
        //if not found return false
      } else {
        return done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  })
);

export default passport;
