import passport from 'passport'

const connectUser = (req, res, next) => {
    passport.authenticate("local", ( err, user, info) => {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({success: `logged in ${user.id}`, user: user})
        })
    })(req, res, next);
}

const logOutUser = (req, res) => {
    req.logout()
    return res.status(200).json({success: `logged out`})
}

const authenticationCheck = (req, res) =>{
    if (req.isAuthenticated()) {
        return res.status(200).json({success: `user authenticated`, user: req.user})
    }
    return res.status(400).json({failed: 'user not authenticated'})
   
  }

export {connectUser, logOutUser, authenticationCheck}