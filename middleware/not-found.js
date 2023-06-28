const notFoundMiddleware = (req, res, next) =>
    res.status(404).send("Route does Not Found");

export default notFoundMiddleware;
