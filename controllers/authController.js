import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(201).json("success");
};

const login = async (req, res) => {
    //testing in postman
    // res.json(req.body.id);
    res.send("login user");
};

const update = async (req, res) => {
    res.send("update user");
};

export { register, login, update };
