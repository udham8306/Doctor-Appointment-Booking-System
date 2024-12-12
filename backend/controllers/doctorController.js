import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    // Find the doctor by ID
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Toggle the availability
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true } // To return the updated document
    );

    res.json({
      success: true,
      message: "Availability changed",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error changing availability:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error fetching DoctorList:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ sucess: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error fetching DoctorList:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { changeAvailablity, doctorList, loginDoctor };
