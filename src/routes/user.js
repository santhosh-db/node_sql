import {Router} from 'express';
const { userController } = require("../controllers");
const authenticate=require('../middleware/authenticate')

const userRoutes = Router();

userRoutes.get('/userList',authenticate,userController.findAll);
//userRoutes.get('/:id',userController.findbyId);
userRoutes.post('/create',userController.create);
userRoutes.put('/update/:id',userController.findbyIdAndUpdate);
userRoutes.delete('/delete/:id',userController.findbyIdAndDelete);
userRoutes.get('/friends',authenticate,userController.friendsList);
userRoutes.post('/friendsList',authenticate,userController.addFriend);
userRoutes.get('/friendsList',authenticate,userController.getFriends);
module.exports = userRoutes;