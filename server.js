const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.error(err);
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/auth', require('./routers/userRouter'));
app.use('/api/bookingreq', require('./routers/bookingReqRouter'));
app.use('/api/pitches', require('./routers/pitchRouter'));
app.use('/api/bookings', require('./routers/bookingRouter'));
app.use('/api/profile', require('./routers/profileRouter'));
