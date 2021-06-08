const jwt = require('jsonwebtoken');

// Allows only logged in user
const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: 'Unauthorized' });
  }
};

// Allows only admin user
// const authAdmin = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified.user;

//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ errorMessage: 'Unauthorized' });
//   }
// };

module.exports = auth;
