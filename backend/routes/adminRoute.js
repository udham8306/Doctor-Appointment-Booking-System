import express from 'express';
import { addDoctor, adminDashboard, allDoctors, appointmentsAdmin, cancelAppointmentByAdmin, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js'; // Ensure correct file extension
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router();


adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailablity);
adminRouter.get("/appointments",authAdmin,appointmentsAdmin)
adminRouter.post("/appointment-cancel",authAdmin,cancelAppointmentByAdmin)
adminRouter.get("/dashboard",authAdmin,adminDashboard)
export default adminRouter;
