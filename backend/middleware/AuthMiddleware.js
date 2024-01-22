import jwt from 'jsonwebtoken';
import User from '../model/user.js';

// export default async function AuthMiddleware(req, res, next) {
//     const token = req.cookies.Authorization;

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET);
//         // if (Date.now() > decoded.exp) res.sendStatus(401)

//         const user = await User.findOne({email: decoded.email});
//         if(!user) res.sendStatus(401);
//         req.user = user;
        
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Unauthorized" })
//     }
// }

export default async function AuthMiddleware(req, res, next) {
    const token = req.cookies.Authorization;

    try {
        if (!token) {
            throw new Error("Token not provided");
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            throw new Error("User not found");
        }
        
        req.user = user;
        next();
    } catch (error) {
        let errorMessage = "Unauthorized";

        if (error.message === "Token not provided") {
            errorMessage = "Token not provided";
        } else if (error.name === 'TokenExpiredError') {
            errorMessage = "Token expired";
        } else if (error.message === "User not found") {
            errorMessage = "User not found";
        }

        res.status(401).json({ message: errorMessage });
    }
}