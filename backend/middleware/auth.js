const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token ) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const tokenValue = token.split(' ')[1];

  try {

    const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);


    const user = await User.findById({_id:decoded.id});
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = { verifyToken };
