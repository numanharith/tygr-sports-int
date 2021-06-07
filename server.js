const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Middleware
app.use(express.json());
app.use(cookieParser());

// MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.error(err);
  console.log('Connected to MongoDB');
});

// Routes
app.use('/auth', require('./routers/userRouter'));
app.use('/bookingreq', require('./routers/bookingReqRouter'));
