const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    try{
        // const token=req.cookies.jwt
        const token=req.headers.authorization.split(' ')[1]
        const decode=jwt.verify(token,'verySecretpass')

        req.user=decode
        next()
    }
    catch(error)
    {
        // console.log(error.message);
        // res.redirect('/');
        res.status(401).json({
            message:error.message
        })
    }
}

module.exports=authenticate