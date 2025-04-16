import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage if you want to store files

const upload = multer({ storage });

export default upload;
