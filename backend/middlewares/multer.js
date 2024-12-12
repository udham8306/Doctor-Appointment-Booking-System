import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Specify the destination directory for uploaded files
        callback(null, 'uploads/'); // Ensure the 'uploads' folder exists
    },
    filename: function (req, file, callback) {
        // Use the original file name for the saved file
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

export default upload;
