import Course from "../modules/course.model.js";
import AppError from "../utilite/util.error.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises';
const getAllCourses = async (req,res)=>{
    try {
        const courses = await Course.find({}).select('-leactures');
    res.status(200).json({
        success:true,
        message:'All course',
        courses,
    })
        
    } catch (error) {
        return next(
            new AppError(error.message,500)
        )
        
    }
    
  
}
const getLeacturesByCourseId = async function(req,res,next){
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        res.status(200).json({
            success:true,
            message:'Course leactures featch successfully',
            leactures:course.lectures

        })

        
    } catch (error) {
        return next(
           new AppError(error.message,500)
        )
        
    }
    



}
const createCourse = async (req,res)=>{
    const {title, description, category,createdBy} = req.body
    if(!title || !description || !category || !createdBy){
        return next(
            new AppError('All field are required',400)
        )
    }
    const course = await Course.create({
        title,
         description,
          category,
          createdBy,
          thumbnail:{
            public_id:"Dummy",
            secure_url:"Dummy",
    
        }

    });
    if(!course){
        return next(
            new AppError('Course can not be created, please try again',500)
        )
    }
    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms'
            });
              if(result){
                course.thumbnail.public_id = result.public_id
                course.thumbnail.secure_url = result.secure_url
            }
               fs.rm(`uploads/${req.file.filename}`)
            
            
        } catch (error) {
            return next(
            new AppError(error.message,500)
            )

            
        }
        
    }
        await course.save()
        res.status(200).json({
        success:true,
        message:'Course created successfully',
        course,
    })
    }




const updateCourse = async (req,res)=>{
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
             runValidators:true
            }
        );

    } catch (error) {
        return next(
            new AppError('Course with given id does not exist',500)
            )
        
    }
    res.status(200).json({
        success:true,
        message:'Course updated successfully'
    })

}
const removeCourse = async (req,res)=>{
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if(!course){
            return next(
                new AppError('Course given id does not exist',500)
            )
        }
        await Course.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'Course remove successfully'
        })

        
    } catch (error) {
        return next(
            new AppError(error.message,500)
            )
        
    }

}
const addLectureToCourseById = async (req,res,next)=>{
    try {
        const {title, description} = req.body()
    const { id } = req.params;
    if(!title || !description){
        return next(
            new AppError('All field are required',400)
        )
    }
    const course = await Course.findById(id)
    if(!course){
        return next(
            new AppError('Course with given id does exsit',500)
        )
    }
    const lectureDate = {
        title,
        description,
        lecture:{}
    }
    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms'
            });
              if(result){
                lectureDate.lecture.public_id = result.public_id
                lectureDate.lecture.secure_url = result.secure_url
            }
               fs.rm(`uploads/${req.file.filename}`)
            
            
        } catch (error) {
            return next(
            new AppError(error.message,500)
            )

            
        }

    }
    course.leactures.push(lectureDate)
    course.numbersOfLeactures = course.leactures.length;
    await course.save()
    res.status(200).json({
        success:true,
        message:'lecture successfully addedd to the course ',
        course,
    })
        
    } catch (error) {
        return next (new AppError(error.message,500))
        
    }
    
    
}
export{
    getAllCourses,
    getLeacturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById
}