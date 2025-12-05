// Custom Error-handler middleware.
const errorHandler = (error, req, res, next) => {
  const code = res.code ? res.code : 500; // If code not exist then use 500.

  res
    .status(code)
    .json({ code, status: false, message: error.message, stack: error.stack });
};

export default errorHandler;
