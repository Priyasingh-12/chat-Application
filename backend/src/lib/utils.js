import jwt  from 'jsonwebtoken';

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
        secure: true, // Set to true if using HTTPS
        expires: new Date(0), // Expire immediately
        secure:process.env.NODE_ENV !== "development"
    });
    return token ;

}

