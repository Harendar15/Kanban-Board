import jwt from "jsonwebtoken";

const auth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    try{
        const jwtSecret = jwt.verify(token , process.env.jwt_secret);
        req.user = jwtSecret;
        next();
    } catch(err){
        return res.status(401).json({message: "Unauthorized"});
    }
};

export default auth;
