const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createUser, login, getMyUser, updateUser, signout,
} = require('../controllers/users');

const { validateLink } = require('../utils/validateLink');
const routeNotFound = require('../middlewares/route-not-found');

// Signup
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

// Signin
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

// Auth
router.use(auth);

// Get all ratings
router.get('/movies', getMovies);

// Add rating
router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      year: Joi.string().required(),
      runtime: Joi.number().required(),
      director: Joi.string().required(),
      country: Joi.string().required(),
      image: Joi.string().required().custom(validateLink),
      plot: Joi.string().required(),
      genre: Joi.string().required(),
      movieId: Joi.number().integer().required(),
      rating: Joi.number().min(0).max(10).required(),
    }),
  }),
  addMovie,
);

// Delete rating
router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie,
);

// Get my user info
router.get('/users/me', getMyUser);

// Update user data
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
  }),
  updateUser,
);

// Signout
router.get('/signout', signout);

// Route that doesn't exist
router.use(routeNotFound);

module.exports = router;
