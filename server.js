import express from 'express'; 
import cors from 'cors';
import cookie from 'cookie-parser';
import routers from './src/routes';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

require ('dotenv').config();

const app=express()

app.use(cors());
app.use(cookie());
const opts = {
    explorer: false,
    swaggerOptions: {
      validatorUrl: null
    },
    customSiteTitle: "Node SQL",
    customfavIcon: "https://www.thedataschool.com.au/wp-content/uploads/2022/12/Sql_data_base_with_logo.png"
  };
  app.use("/docs", swagger.serve, swagger.setup(swaggerDocument, opts));
//template engine
app.set('view engine','ejs')

// create application/json parser
app.use(express.json())

app.use(morgan('dev'))

// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }))

routers(app);

//test api

app.get('/dash',(req,res)=>{
    res.render('dash')
})

//NODE_ENV
console.log(`Node env is ${process.env.NODE_ENV}`);

//PORT
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})