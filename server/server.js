const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const express = require('express');
const volleyball = require('volleyball');
// making the express app
const app = express();
// adding volleyball
app.use(volleyball);

const userRoutes = require('./routes/user.routes');

app.use(express.static(__dirname));
const authRoutes = require('./routes/auth.routes');


// connecting to database
// TODO: move this to another file
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

// routing users path

app.use('/users',userRoutes);
app.use('/auth',authRoutes);

// letting server listen

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('Server started on port %s.', port);
});

