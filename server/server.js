require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const connectDB = require('./db/connect')
//const authenticateUser = require('./middleware/authentication')

const authRouter = require('./routes/auth')
const hotelsRouter = require('./routes/hotels')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json());
app.use(cors())

app.use('/hotels-api/auth', authRouter)
app.use('/hotels-api/hotels', hotelsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.get('/', (req, res) => {
    res.send(`
      <h1>Server Main</h1>
      `)
})

const port = process.env.PORT

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}/`)
    );
  } catch (error) {
    console.log(err);
  }
};

start();