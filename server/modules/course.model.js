import { model, Schema } from 'mongoose';
const CourseSchema = new Schema({
    
    title:{
        type:String,
        required:[true,'Titel is required'],
        minLength:[8,'Title must be 8 character'],
        maxLength:[60,'Title must be 60 character'],
        trim:true,


    },
    description:{
        type:String,
        minLength:[500,'Title must be 500 character'],
        maxLength:[1000,'Title must be 1000 character'],
      

    },
    category:{
        type:String,
        required:[true,'Description is required']

    },
    thumbnail:{
        public_id:{
            type:String,
            required:true

        },
        secure_url:{
            type:String,
            required:true

        }

    },
    leactures: [
        {
            title:String,
            description:String,
            leacture:{
                public_id:{
                    type:String,
                    required:true


                },
                secure_url:{
                    type:String,
                     required:true

                }
            }
        }

    ],
    numbersOfLeactures:{
        type:Number,
        default:0


    },
    createdBy:{
        type:String,
        required:true
    }
    
},{
   timestamps:true
});
const Course = model('Course',CourseSchema);
export default Course; 