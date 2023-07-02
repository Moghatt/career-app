import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
        throw new BadRequestError("Please enter all fields");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use");
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastNmae: user.lastNmae,
        },
        token,
        location: user.location,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please enter all fields");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
    }
    // console.log(user);
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        throw new UnAuthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();

    //testing in postman
    // res.json(req.body.id);
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const update = async (req, res) => {
    res.send("update user");
};

export { register, login, update };
