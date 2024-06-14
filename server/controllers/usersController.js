// import user model
const User = require("../models/user");
const passport = require("passport");

module.exports = {
  authenticate: (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password incorrect");
        error.status = 401;
        return next(error);
      }
      // this creates a session and triggers serialization. It also attached the user to req.user
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // If authentication succeeds, return user object without password
        res.send({ message: "User authenticated!", user: req.user });
      });
    })(req, res, next);
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.send("User logged out");
  },

  readAll: (req, res, next) => {
    console.log(req.isAuthenticated());
    // Adjust to not send passwords back
    User.find({})
      .exec()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  },

  create: (req, res, next) => {
    // Creating a new user with passport-local-mongoose
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(200);
      }
    );
  },

  read: (req, res, next) => {
    // code to read/get user
  },
  update: (req, res, next) => {
    // code to update/edit user info
  },
  delete: (req, res, next) => {
    // code to delete user
  },
};
