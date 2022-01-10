const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');
const { errorMessages } = require('../errors/error-config');

const validateLink = (value) => {
  if (validator.isURL(value)) return value;
  throw new BadRequestError(errorMessages.validationErrorMessage.default);
};

module.exports = { validateLink };
