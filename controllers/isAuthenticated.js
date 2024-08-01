const isAuthenticated = (req) => {
  if (!req.user) {
    return false;
  }
  return true;
};

module.exports = isAuthenticated;
