const {models:{User}} =require("../models");
const ejs = require('ejs');
const path = require('path');

const findAll = async(req,res)=>{
    const users = await User.findAll()
    const html = await ejs.renderFile(path.join(__dirname,"../../views/dash.ejs"),{users},{async:true})
    res.send(html);
}

const findbyId = async(req,res)=>{
    const user = await  User.findOne({
        where:{
            id: req.params.id
        }
    })
    res.json(user)
}

const create = async(req,res)=>{
    console.log(req.body);
    const create = await  User.create(req.body);
    res.redirect('/api/user/')
}

const findbyIdAndUpdate = async(req,res)=>{
    console.log(req.body);
    const users = await  User.update(req.body,{
        where:{
            id: req.params.id
        }
    })
    res.redirect('/api/user/')
}

const findbyIdAndDelete = async(req,res)=>{
    const users = await  User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/api/user/')
}

module.exports={
    findAll,
    findbyId,
    create,
    findbyIdAndUpdate,
    findbyIdAndDelete
}