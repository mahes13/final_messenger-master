import express from "express";

import {getFriends,messageUploadDB,messageGet,ImageMessageSend,messageSeen,delivaredMessage,deleteMineMessage,deleteBothMsg} from '../controller/messengerController.js';
const router=express.Router();
import { authMiddleware }  from '../middleware/authMiddleware.js';

router.get('/get-friends',authMiddleware, getFriends);
router.post('/send-message',authMiddleware, messageUploadDB);
router.get('/get-message/:id',authMiddleware, messageGet);
router.post('/image-message-send',authMiddleware, ImageMessageSend);

router.post('/seen-message',authMiddleware, messageSeen);
router.post('/delivared-message',authMiddleware, delivaredMessage);
router.post('/delete-mine-msg', deleteMineMessage);
router.post('/delete-both-msg', deleteBothMsg);
 

// module.exports = router;
export default router;