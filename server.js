const bodyParser=require('body-parser')
const express=require('express')
const cors=require('cors')

const app=express()

app.use(cors())

// create application/json parser
var jsonParser = bodyParser.json()
app.use(jsonParser)

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

//test api
app.get('/',(req,res)=>{
    res.send({msg:"Hello"})
})

//PORT
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})