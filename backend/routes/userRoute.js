import express from 'express';
import { bookAppointment, cancelAppointment,  getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import multer from 'multer';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();


// Define routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser , updateProfile);
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/list-appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment )
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verify-razorpay',authUser,verifyRazorpay)
export default userRouter;
