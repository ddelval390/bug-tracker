import express from 'express';
import session from 'express-session';
import auth from './routes/auth.route.js';
import passport from './passport/setup.js'


const app = express();

// Bodyparser 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Express Session
let hour = 3600000
app.use(
    session({
        secret: 'very secret this is',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: hour}
    })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', auth)

app.get('/',(req,res) => {
    res.send('Welcome to Node Babel')

})

export default app;