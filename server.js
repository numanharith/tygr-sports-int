const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, 'build')));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// Connect to MongoDB & remove warnings
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
  if (err) return console.error(err);
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/auth', require('./routers/userRouter'));
app.use('/api/pitches', require('./routers/pitchRouter'));
app.use('/api/bookings', require('./routers/bookingRouter'));
app.use('/api/profile', require('./routers/profileRouter'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));