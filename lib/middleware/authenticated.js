module.exports = function(req, res, next) {
  if (req.session._barnyrd_oath_token) {
    next();
  } else {
    res.render('/', {errors: "You are not logged in"});
  }
};