const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = { verifyToken };
