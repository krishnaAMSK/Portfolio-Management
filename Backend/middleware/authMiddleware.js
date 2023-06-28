const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Modify this URL to your login page URL
};

module.exports = authMiddleware;
