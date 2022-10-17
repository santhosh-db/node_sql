import express from 'express'; 
import cors from 'cors';
//import expressLayouts from 'express-ejs-layouts';
import routers from './src/routes';
import morgan from 'morgan';

require ('dotenv').config();

const app=express()

app.use(cors());


//template engine
app.set('view engine','ejs')
//app.use(expressLayouts)

// create application/json parser
app.use(express.json())

app.use(morgan('dev'))

// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }))

routers(app);

//test api
app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/dash',(req,res)=>{
    res.render('dash')
})
//PORT
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})