import multer from "multer"

const storage=  multer.memoryStorage();

const uploadSingle = multer({storage}).single("file");


export default uploadSingle
