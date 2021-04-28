import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import passport from 'passport'
import passportLocal from 'passport-local'


const LocalStrategy = passportLocal.Strategy


passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
        const isSignUp = req.body.isSignUp

        if (!isSignUp) {
            User.findOne({ email: email })
                .then(user => {
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    })

                })
                .catch(err => {
                    return done(null, false, { message: err });
                });
        }

        if (isSignUp) {

            User.findOne({ email: email }).then(user => {
                if (user) {
                    return done(null, false, { message: "This user already exist" });
                }
                
                let name = req.body.name
                
                const newUser = new User({ name: name, email: email, password: password })
    
                // Hash password

                
                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                return done(null, user);
                            })
                            .catch(err => {
                                console.log(err.message)
                                return done(null, false, { message: err });
                            });
    
                    });
                });
            })
          
        }

    })
);

export default passport;