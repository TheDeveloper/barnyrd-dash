module.exports = function(req, res, next) {
  if (req.session._barnyrd_animal) {
    next();
  } else {
    res.render('/lobby', {errors: "You are not logged in"});
  }
};