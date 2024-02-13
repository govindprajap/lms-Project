// import mongoose from "mongoose";
// mongoose.set('strictQuery',false);
// const connectionToDb = async ()=>{
//     try {
//         const {connection} = await mongoose.connect(
//             process.env.MONGO_URI || "mongodb://localhost:27017/my_database"
           
//         );
//         if(connection){
//             console.log(`Connect to mongodb: ${connection.host}`);
//         }
        
//     } catch (error) {
//         console.log(error);
//         process.exit(1)
//  }
   
// }
// export default connectionToDb;
// const mongoose = require("mongoose");
// import mongoose from "mongoose";
// const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/mylms";
// const databaseconnect = ()=>{
//     mongoose
//     .connect(MONGODB_URL)
//     .then((conn)=>console.log(`connect to db:${conn.connection.host}`))
//     .catch((err)=>console.log(err.message));
// }
// export default databaseconnect;
// const mongoose = require("mongoose");
import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/my_database";
const databaseconnect = ()=>{
    mongoose
    .connect(MONGODB_URL)
    .then((conn)=>console.log(`connect to db my name is govind prajapati:${conn.connection.host}`))
    .catch((err)=>console.log(err.message));
}
export default databaseconnect;
