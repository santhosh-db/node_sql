const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        const decode=jwt.verify(token,'verySecretpass')

        req.user=decode
        next()
    }
    catch(error)
    {
        console.log(error.message);
        res.redirect('/');
    }
}

module.exports=authenticate