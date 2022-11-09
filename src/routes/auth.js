

import {Router} from 'express';
const { authController } = require("../controllers");
const authenticate=require('../middleware/authenticate')
const AuthRoutes = Router();

AuthRoutes.post('/login',authController.loginPost);
AuthRoutes.get('/',authController.loginGet);
AuthRoutes.post('/contact',authController.contactPost);
AuthRoutes.get('/contact',authenticate,authController.contactGet);
AuthRoutes.get('/logout',authController.logout);

module.exports = AuthRoutes;