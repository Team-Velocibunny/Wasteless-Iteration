const User = require('./userModel');

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
 
  User.create(req.body)
    .then((data)=> {
      console.log('New user data: ', data);
      res.locals.ssid = data._id;
      return next();
    })
    .catch((err) => {
      // console.log(err)
      // res.locals.error = err;
      res.render('./../client/signup', {error: err});
      return next(err);
    })
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  const { username, password } = req.body;
 
  User.find({username: username, password: password}, (err, data) => {
    if (err) next(err);
    if (data.length === 0) {
      res.redirect('../login');
    } else {
      console.log(data);
      console.log(data[0]._id);
      res.locals.ssid = data[0]._id;
      return next();
    }
  });
};



module.exports = userController;
