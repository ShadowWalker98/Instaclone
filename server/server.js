const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const { once } = require('nodemon');
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log(`MongoDB Database successfully Connected!`);
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log("Hello me is alive");
});

app.use('/users',userRoutes);


const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('Server started on port %s.', port);
});