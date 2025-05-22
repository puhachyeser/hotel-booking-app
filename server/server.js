require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors');

const connectDB = require('./db/connect')

app.use(cors());

app.get('/', (req, res) => {
    res.send(`
      <h1>Server Main</h1>
      `)
})

app.get('/api/hello', (req, res) => {
    res.json("Hello from server")
})

const port = process.env.PORT

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}/ ...`)
    );
  } catch (error) {
    console.log(err);
  }
};

start();