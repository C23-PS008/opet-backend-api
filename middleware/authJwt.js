import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import requestResponse from'../response.js';
dotenv.config();

export const verifyToken = (req, res, next) => {
    const { authorization }= req.headers;
    if(!authorization) return res.status(403).json(requestResponse.failed('Authorization header required!'));

    const token = authorization.split(' ').pop()

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(401).json(requestResponse.failed('Invalid token!'));
        req.userId = decoded.uid;
        next();
    });
}
