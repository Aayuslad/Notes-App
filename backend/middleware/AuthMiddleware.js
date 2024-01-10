import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export default async function AuthMiddleware(req, res, next) {
    const token = req.cookies.Authorization;

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (Date.now() > decoded.exp) res.sendStatus(401)

        const user = await User.findOne({email: decoded.email});
        if(!user) res.sendStatus(401);
        req.user = user;
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}