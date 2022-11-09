const {models:{User}} =require("../models");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

const loginPost =async (req, res) => {
    try{
        const {email,password} = req.body
        
        const user = await  User.findOne({
            where:{
                email: email,password:password
            }
        })
        if(user){
            let token = jwt.sign({ id: user.id ,name:user.name}, 'verySecretpass', { algorithm: 'HS256' }, { expiresIn: '1hr' })
            res.cookie('jwt',token,{httpOnly:true, maxAge:60*60*24*1000});
            res.json({user:user});
        }  
        else{
            res.json({error:"Invalid credintials"})
        }
    }             
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}
const loginGet =async (req, res) => {
    //const html = await ejs.renderFile(path.join(__dirname,"../../views/login.ejs"));
    res.render('login');
}

const logout = (req,res)=>{
    //res.cookie('jwt','',{expires: new Date(0)});
    res.clearCookie('jwt');
    res.redirect('/')
};

const contactGet =async (req, res) => {
    //const html = await ejs.renderFile(path.join(__dirname,"../../views/contact.ejs"));
    res.render('contact');
}

const contactPost =async (req, res) => {
    try{
        const {name,email,subject,message} = req.body
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                  user: "santhosh.pd@doodleblue.in",
                  pass: "Doodle123#"
                }
        });
        
        const messageOptions = {
            subject: subject,
            from: transporter.options.auth.user,
            to: transporter.options.auth.user,
            html: `You got a message from <br/><br/>
                Email : ${email} <br/>
                Name: ${name} <br/>
                Message: ${message}`,
          };

          const messageOptions2 = {
            subject: "Contact Gesture",
            from: transporter.options.auth.user,
            to: email,
            html: `Thanks for contacting us ${name}. We will contact you soon`,
          };

          try{
            let mail=await transporter.sendMail(messageOptions);
            let mail2=await transporter.sendMail(messageOptions2);
            if(mail && mail2){
                console.log(mail,"***",mail2);
                res.json("mail sent");
            }
          }
          catch(e){
            console.log(err);
          }

    }             
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}


module.exports={loginPost,loginGet,logout,contactGet,contactPost}