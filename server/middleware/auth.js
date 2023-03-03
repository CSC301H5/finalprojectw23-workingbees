// Reference: https://dev.to/jeffreythecoder/setup-jwt-authentication-in-mern-from-scratch-ib4

import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

    const token = req.header('x-auth-token');
 
    if (!token) {
        return res.status(401).json("Token invalid. Access denied Missing Token.");
    }


    try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ msg:"Token invalid. Access denied.Incorrect Token" });
        } else {
            req.userID = decoded.userID;
            next();
        }
        });
    } catch (e) {
        console.error('AUTH MIDDLEWARE ERROR!');
        console.error(e);
        res.status(500).json({ msg: 'Server Error' });
    }

} 
export default auth