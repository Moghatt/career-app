import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Internal Server Error",
    };
    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.message = "User already exists";
    }
    res.status(defaultError.statusCode).json({ error: defaultError.message });
};
export default errorHandlerMiddleware;
