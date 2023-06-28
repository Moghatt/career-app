import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
    };
    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }
    res.status(defaultError.statusCode).json({ error: defaultError.message });
};
export default errorHandlerMiddleware;
