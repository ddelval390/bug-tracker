import express from 'express';
import session from 'express-session';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import passport from './passport/setup.js'
import helmet from 'helmet'
import cors from 'cors'
import compress from 'compression'

const app = express();


app.use(compress())
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

let hour = 3600000
app.use(
    session({
        secret: 'very secret this is',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: hour}
    })
)

app.use(cors())
app.use(helmet())

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', projectRoutes)
app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('/',(req,res) => {
    res.send('Welcome to Node Babel')

})

export default app;