import express from 'express'
import session from 'express-session'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import passport from './passport/setup.js'
import helmet from 'helmet'
import cors from 'cors'
import compress from 'compression'
import mongoose from 'mongoose'
import socketConnection from './socket.js'
import { MONGOURI, PORT, SECRET } from './config/config.js'
import path from 'path'

const __dirname = process.cwd()


const app = express()

app.use(express.static(path.join(__dirname, '../client/build')))

app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

let hour = 3600000
app.use(
    session({
        secret: SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: hour}
    })
)

app.use(cors())
app.use(helmet())

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', projectRoutes)
app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

// DB connection
mongoose.Promise = global.Promise
mongoose.connect(MONGOURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

const server = app.listen(PORT,() => {
     console.log(`app is listening on port ${PORT}`)
})

const io = socketConnection.init(server)

io.on('connection', socket => {
  socket.on('disconnect homePage', () => {
    socket.leave('home')
  })
  socket.on('project updates', room => {
    socket.join(room)
  })
  socket.on('disconnect project updates', room => {
    socket.leave(room)
  })
  socket.on('ticket updates', room => {
    socket.join(room)
  })
  socket.on('disconnect ticket updates', room => {
    socket.leave(room)
  })
})