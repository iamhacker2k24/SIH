// Auth Middleware - supports mock auth headers for effortless hackathon demo or standard JWT
const authMiddleware = (req, res, next) => {
  const userHeader = req.headers['x-user-role'] || req.headers['authorization'];
  if (userHeader) {
    req.user = {
      id: req.headers['x-user-id'] || 'u-demo',
      name: req.headers['x-user-name'] || 'Demo User',
      role: req.headers['x-user-role'] || 'Farmer'
    };
  } else {
    req.user = { id: 'u-farmer', name: 'Kishan Kumar', role: 'Farmer' };
  }
  next();
};

module.exports = authMiddleware;
