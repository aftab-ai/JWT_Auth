// API 404 not-found route.
const notFound = (req, res, next) => {
  res.status(404).json({ code: 404, status: false, message: "API not found!" });
};

export default notFound;
