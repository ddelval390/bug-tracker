import app from './express.js';
import mongoose from 'mongoose'
import socketConnection from './socket.js';


// DB connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/bug-tracker', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

const server = app.listen(5000,() => {
     console.log('app is listening to port 5000');
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