// const app = require("./app");
import app from './app.js';
import databaseconnect from './confij/dbConnection.js';
import cloudinary from 'cloudinary';


// const {config} = require('dotenv')
// config();
const PORT = process.env.PORT || 5000
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(PORT, ()=>{
    databaseconnect();
    
   
    console.log(`app is running at port ${PORT}`)
})