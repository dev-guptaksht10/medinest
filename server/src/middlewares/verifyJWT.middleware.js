import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";

import ErrorWrapper from "../utils/ErrorWrapper.util.js";
import ErrorHandler from "../utils/ErrorHandler.util.js";

export const authUser = ErrorWrapper(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    if (!token) {
        return res.status(401).json({ message: "Not authorized to access, kindly login first and try again!" });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const userRecord = await User.findOne({ _id: decodedUser.userid }).select("-password");

        if (!userRecord) {
            return res.status(404).json({ message: "User not found, auth" });
        }

        req.user = userRecord;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized to access, kindly login first and try again!" });
    }
});


export const authDoctor = ErrorWrapper(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    if (!token) {
        return res.status(401).json({ message: "Not authorized to access, kindly login first and try again!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doct = await Doctor.findOne({ _id: decoded.docid }).select("-password");

        if (!doct) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // If you really need to compare tokens, ensure the doctor record has a token field
        if (doct.token && token !== doct.token) {
            return res.status(401).json({ message: "Session expired, please login again" });
        }

        req.doct = doct;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
});