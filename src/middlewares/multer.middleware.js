import multer from "multer";

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder
    cb(null, "./public/temp"); // The folder where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Create a unique filename
  },
});

// Export the upload middleware
export const upload = multer({
  storage,
});
