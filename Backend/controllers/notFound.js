// API 404 not-found route.
const notFound = (req, res, next) => {
  res
    .status(404)
    .json({
      stutusCode: 404,
      status: false,
      code: "API_NOT_FOUND",
      message: "API not found!",
    });
};

export default notFound;
