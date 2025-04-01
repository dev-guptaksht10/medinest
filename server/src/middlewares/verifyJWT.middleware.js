import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";

import ErrorWrapper from "../utils/ErrorWrapper.util.js";
import ErrorHandler from "../utils/ErrorHandler.util.js";

export const authUser = ErrorWrapper(async (req, res, next) => {
    const user = typeof req.body.user === 'string' ? JSON.parse(req.body.user) : req.body.user;
    const token = user.token;
    if (!token) {
        throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
    }
    try {

        let user = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findOne({
            _id: user.userid,
        }).select("-password");

        if (token != user.token) {
            throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
    }
})


export const authDoctor = ErrorWrapper(async (req, res, next) => {
    const user = typeof req.body.user === 'string' ? JSON.parse(req.body.user) : req.body.user;
    const token = user.token;
    if (!token) {
        throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
    }
    try {

        let doct = jwt.verify(token, process.env.JWT_SECRET);
        doct = await Doctor.findOne({
            _id: doct.docid,
        }).select("-password");

        if (token != doct.token) {
            throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
        }
        req.doct = doct;
        next();
    } catch (error) {
        throw new ErrorHandler(401, "Not authorized to access, kindly login first and try again!");
    }
})