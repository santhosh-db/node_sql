import {Router} from 'express';
const { userController } = require("../controllers");

const userRoutes = Router();

userRoutes.get('/',userController.findAll);
userRoutes.get('/:id',userController.findbyId);
userRoutes.post('/create',userController.create);
userRoutes.post('/update/:id',userController.findbyIdAndUpdate);
userRoutes.post('/delete/:id',userController.findbyIdAndDelete);

module.exports = userRoutes;