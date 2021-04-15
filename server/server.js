import app from './express.js';
import mongoose from 'mongoose'


// DB connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/bug-tracker', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.listen(5000,() => {
     console.log('app is listening to port 5000');
})