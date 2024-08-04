const isAuthenticated = (req) => {
  return req.user ? true : false;
};

module.exports = isAuthenticated;
