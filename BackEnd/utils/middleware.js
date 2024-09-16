const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "Key not in DB") {
    return response.status(error.status).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "JsonWebToken: token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "Password not valid") {
    return response.status(error.status).json({ error: error.message });
  }

  next(error);
};

const userExtractor = (request, response, next) => {
  try {
    request.user = jwt.verify(request.cookies?.authToken, process.env.SECRET);  // request.cookie['cookiename']
  } catch {
    request.user = null;
  }
  logger.info(`userExtractor. Is request.user null: ${request.user === null}`);
  console.log(request.cookies.authToken);
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
