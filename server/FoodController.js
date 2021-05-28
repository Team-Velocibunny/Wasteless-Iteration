const models = require('./FoodModel');
const FoodController = {};

FoodController.getFood = (req, res, next) => {
  models.Food.find({ status: 'to buy' })
    .then((data) => {
      if (data[0] === undefined) {
        return next({
          log: `Food.getFood: ERROR`,
          message: {
            err: 'Error occurred in Food.getFood. Check server logs for more details.',
          },
        })
      }
      res.locals.food = data;
      return next();
    })
    .catch((err) =>
      next({
        log: `Food.getFood: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.getFood. Check server logs for more details.',
        },
      })
    );
};

FoodController.addFood = (req, res, next) => {
  const { item } = req.body;
  // , type, quantity, date, price, expiration, status, preference, outcome
  models.Food.create({
    item,
    // type,
    // quantity,
    // date,
    // price,
    // expiration,
    // status,
    // preference,
    // outcome,
  })
    .then((data) => {
      res.locals.food = data;
      // console.log(res.locals.food);
      return next();
    })
    .catch((err) =>
      next({
        log: `FoodController.addFood: ERROR: ${err}`,
        message: {
          err: 'Error opccurred in FoodController.addFood. Check server logs for more details.',
        },
      })
    );
};

FoodController.deleteFood = (req, res, next) => {
  // gets all info/data from the one food item
  models.Food.deleteOne({ item: req.params.item }).then(() => {return next()}).catch((err) =>
    next({
      log: `Food.deleteFood: ERROR: ${err}`,
      message: {
        err: 'Error occurred in Food.deleteFood. Check server logs for more details.',
      },
    })
  );
};

// update item name with user input
FoodController.updateFoodName = (req, res, next) => {
  models.Food.findOneAndUpdate({ item: req.params.item }).catch((err) =>
    next({
      log: `Food.updateFoodName: ERROR: ${err}`,
      message: {
        err: 'Error occurred in Food.updateFoodName. Check server logs for more details.',
      },
    })
  );
};

// update status to purchased
FoodController.updateFoodStatus = (req, res, next) => {
  models.Food.findOneAndUpdate({ item: req.params.item }, { $set: { status: 'purchased' } }).then(() => {return next()}).catch(
    (err) =>
      next({
        log: `Food.updateFoodStatus: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.updateFoodStatus. Check server logs for more details.',
        },
      })
  );
};

// find food with status of purchased
FoodController.getPurchasedFood = (req, res, next) => {
  models.Food.find({ status: 'purchased', outcome: '' })
    .then((data) => {
      res.locals.purchased = data;
      return next();
    })
    .catch((err) =>
      next({
        log: `Food.getPurchasedFood: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.getPurchasedFood. Check server logs for more details.',
        },
      })
    );
};

// update outcome to eaten
FoodController.updateEaten = (req, res, next) => {
  models.Food.findOneAndUpdate({ item: req.params.item }, { $set: { outcome: 'eaten' } }).catch(
    (err) =>
      next({
        log: `Food.updateEaten: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.updateEaten. Check server logs for more details.',
        },
      })
  );
};

// find food with outcome of eaten
FoodController.getEatenFood = (req, res, next) => {
  models.Food.find({ outcome: 'eaten' })
    .then((data) => {
      res.locals.eaten = data;
      return next();
    })
    .catch((err) =>
      next({
        log: `Food.getEatenFood: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.getEatenFood. Check server logs for more details.',
        },
      })
    );
};

// update preference to liked
FoodController.updateLiked = (req, res, next) => {
  models.Food.findOneAndUpdate({ item: req.params.item }, { $set: { preference: 'liked' } }).catch(
    (err) =>
      next({
        log: `Food.updateLiked: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.updateLiked. Check server logs for more details.',
        },
      })
  );
};

// find food with preference of liked
FoodController.getLikedFood = (req, res, next) => {
  models.Food.find({ preference: 'liked' })
    .then((data) => {
      res.locals.liked = data;
      return next();
    })
    .catch((err) =>
      next({
        log: `Food.getLikedFood: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.getLikedFood. Check server logs for more details.',
        },
      })
    );
};

// update preference to disliked
FoodController.updateDisliked = (req, res, next) => {
  models.Food.findOneAndUpdate(
    { item: req.params.item },
    { $set: { preference: 'disliked' } }
  ).catch((err) =>
    next({
      log: `Food.updateDisliked: ERROR: ${err}`,
      message: {
        err: 'Error occurred in Food.updateDisliked. Check server logs for more details.',
      },
    })
  );
};

// find food with outcome of eaten
FoodController.getDislikedFood = (req, res, next) => {
  models.Food.find({ preference: 'disliked' })
    .then((data) => {
      res.locals.disliked = data;
      return next();
    })
    .catch((err) =>
      next({
        log: `Food.getDislikedFood: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.getDislikedFood. Check server logs for more details.',
        },
      })
    );
};

// update outcome to disposed
FoodController.updateDisposed = (req, res, next) => {
  models.Food.findOneAndUpdate({ item: req.params.item }, { $set: { outcome: 'disposed' } }).catch(
    (err) =>
      next({
        log: `Food.updateDisposed: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.updateDisposed. Check server logs for more details.',
        },
      })
  );
};

// find food with outcome of disposed
FoodController.getDisposedFood = (req, res, next) => {
  models.Food.find({ outcome: 'disposed' })
    .then((data) => {
      res.locals.disposed = data;
      return next();
    })
    .catch((err) =>
      next({
        log: `Food.getDisposedFood: ERROR: ${err}`,
        message: {
          err: 'Error occurred in Food.getDisposedFood. Check server logs for more details.',
        },
      })
    );
};

//create new user entry

//

module.exports = FoodController;
