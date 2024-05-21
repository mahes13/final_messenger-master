// const router = require('express').Router();

// const {userRegister,userLogin,userLogout} = require('../controller/authController');
// const { authMiddleware } = require('../middleware/authMiddleware');

// router.post('/user-login',userLogin);
// router.post('/user-register',userRegister);
// router.post('/user-logout',authMiddleware,userLogout);

// export default router;

import express from "express";
const router=express.Router();

import {userRegister,userLogin,userLogout, deleteMyAccount,profileImgChange} from '../controller/authController.js';
import { authMiddleware,sendOtpEmail } from '../middleware/authMiddleware.js';
 router.post("/user-login", userLogin);       //userLogin is fun'n name therefore using router.post here
 router.post("/user-register", userRegister);
 router.post('/user-logout',authMiddleware,userLogout);
 router.post(`/deleteMyAccount`,deleteMyAccount);
 router.post(`/user-profile_img_update`,profileImgChange);
router.post('/sendotp', sendOtpEmail);


export default router;