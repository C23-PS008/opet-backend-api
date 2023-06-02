import User from "../models/userModel.js";
import requestResponse from'../response.js';

export const verifUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json(requestResponse.failed("Please login to your account"))
    }
    const user = await User.findOne({
        attributes:['uid', 'name', 'email'],
        where: {
            uid: req.session.userId
        }
    });
    if(!user) return res.status(404).json(requestResponse.failed("User not found!"))
    req.userId = user.uid;
    next();
}