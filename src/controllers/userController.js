const {models:{User,Friend}} =require("../models");
const ejs = require('ejs');
const { Op } = require("sequelize");
const jwt=require('jsonwebtoken')
const path = require('path');
import pagination from "../utils/pagination";

const findAll = async(req,res)=>{
    try
    {
        const options = {
            page: req.query.page || 1,
            size: req.query.size || 5
        };
        const payload= await User.findAll();
        let result = await pagination(payload, options);
        let users= result.data;
        res.status(200).json(result)
        // const html = await ejs.renderFile(path.join(__dirname,"../../views/dash.ejs"),{users:users,current:result.page,pages:result.pageCount});
        // res.send(html);
        //res.json(result)
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

const findbyId = async(req,res)=>{
    try
    {
        const user = await  User.findOne({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

const create = async(req,res)=>{
    try
    {
        let rec = await User.findOne({ order: [ [ 'id', 'DESC' ]], });
        let custid=Number(rec.id.substring(4));
        let newId= "USR-"+(custid+1);
        const create = await  User.create({id:newId,...req.body});
        res.status(200).json(create);
        //res.redirect('/user?page=1')
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}


const findbyIdAndUpdate = async(req,res)=>{
    try
    {
        const users = await  User.update(req.body,{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(users);
        //res.redirect('/user?page=1');
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

const findbyIdAndDelete = async(req,res)=>{
    try
    {
        const users = await  User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(users)
        //res.redirect('/user?page=1');
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

const addFriend = async(req,res)=>{
    try
    {
        const find=await Friend.findOne({
            where:{
                [Op.or]: [
                    { user_id:req.user.id,friend_id: req.body.friendId}, 
                    { friend_id:req.user.id,user_id: req.body.friendId }
                ]
            }
        })
        if(find){
            res.send({error:'Already Friends'})
        }
        else{
            const create= await  Friend.create({
                user_id:req.user.id,
                friend_id:req.body.friendId
            });
            if(create){
                const result= await Friend.findAll({
                    where:{
                             user_id:req.user.id
                    },
                    include: [{
                        model: User,
                        as: "user"
                    }]
                })
                res.send(result); 
            }
        }
        
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}
const getFriends = async(req,res)=>{
    try
    {   
            const results=[]
            const result1= await Friend.findAll({
                where:{
                         user_id:req.user.id
                },
                include: [{
                    model: User,
                    as: "user"
                }]
            })
            const result2= await Friend.findAll({
                where:{friend_id:req.user.id},
                include: [
                {
                    model: User,
                    as: "frnd"
                }]
            })
            results.push(result1,result2)
            let result=results.flat(1)
            const html = await ejs.renderFile(path.join(__dirname,"../../views/friendList.ejs"),{users:result});
            res.send(html); 
    }
    catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}



const friendsList = async(req,res)=>{
    try{
        const userid= req.user.id;
        let search=req.query.search;
        if(search!=""){
            const result=await User.findAll({
                where: {
                    id: {
                        [Op.ne]: userid
                    },
                    [Op.or]: [
                        { name:{[Op.regexp]: `${search}`}}, 
                        { email: {[Op.regexp]: `${search}`} }
                    ]
                }
              });
        
          const html = await ejs.renderFile(path.join(__dirname,"../../views/friends.ejs"),{users:result,search:search});
          res.send(html);
        }
        else{
            res.redirect('/user/friends')
        }

    }
    catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}



module.exports={
    findAll,
    findbyId,
    create,
    findbyIdAndUpdate,
    findbyIdAndDelete,
    friendsList,
    addFriend,
    getFriends
}