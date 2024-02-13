import User from "../modules/user.model.js";
import AppError from "../utilite/util.error.js";
import cloudinary from "cloudinary";
import fs from 'fs/promises';
import sendEmail from "../utilite/sendEmail.js";
import crypto from 'crypto';
const cookieOptions = {
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
    secure:true,
}


const register = async (req,res,next)=>{
    const {fullName,email, password} = req.body;
    if(!fullName || !email || !password){
        return next(new AppError('All field are required', 400));
    }
    const userExit = await User.findOne({email});
    if(userExit){
        return next(new AppError('Eamil Already exit', 400));

    }
    try {
        const user = await User.create({
            fullName,
            email,
            password,
        
        })
       
        await user.save()
       
        res.status(201).json({
            success:true,
            message: "User registration successfull",
            user,
        })
        
    } catch (error) {
        res.status(501).send({msg:error.message})
    }



}
const login = async (req,res,next)=>{
    try {
        const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError('All field are required',400));

    }
    const user = await User.findOne({
        email

    }).select('+password')
    if(!user || !user.comparePassword(password)){
        return next(new AppError('eamil and password does not match',400))
    }
    
    // Generate jwt token
    const token = await user.generateJWTToken();
    user.password = undefined
    res.cookie('token', token, cookieOptions);
    res.status(200).json({
        success:true,
        message: 'User login successfully',
        user,
    });
        
    } catch (error) {
        return next(new AppError(error.message,500));
 }
    
}
const logout = (req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true,


    });
    res.status(200).json({
        success:true,
        message:'User loggout successfully'
    })



}
const getProfile = async (req,res)=>{
    try {
        const userId  = req.user.id;
        const user = await user.findOne(userId) 
        res.status(200).json({
            success:true,
            message:'User details',
            user
        })
        
    } catch (error) {
        return next(new AppError('failed to featch profile details',500))
        
    }
    


}
const forgotPassword = async (req,res,next)=>{
    const { email } = req.body;
    if(!email){
        return next(new AppError('Email is required',400))

    }
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('Email not register',400))
   }
   const resetToken = await user.generatePasswordResetToken();
   await user.save();
   const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
   console.log(resetPasswordURL)
   const subject = 'ResetPassword'
   const message = `You can send reset password by clicking <a href=${resetPasswordURL} target="_blanck">Reset your password`
   try {
    await sendEmail(email,subject,message);
    res.status(200).json({
        success:true,
        message:`Reset PAssword has been send to register email id ${email}`
    })
    
   } catch (error) {
    user.forgetPasswordExpiry = undefined;
    user.forgetPasswordToken = undefined;
    await user.save();
    return next(new AppError(error.message,500));

    
   }


}
const resetPassword = async (req,res)=>{
    const { reset } = req.param;
    const { password } = req.body;
    const forgetPasswordToken = crypto
    .createHash('sha256')
    .update(reset)
    .digest('hex')
    const user = await User.findOne({
        forgetPasswordToken,
        forgetPasswordExpiry:{$gt: Date.now()}
    })
    if(!user){
        return next(
            new AppError('Token is invalid, Please try again', 400)
        )
    }
    user.password = password;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;
    user.save();
    res.status(200).json({
        success:true,
        message:'Your password change successfull'
    })


}
const changePasswword = async (req,res)=>{
    const {oldPassword, newPassword} = req.body();
    const { id } = req.user;
    if(!oldPassword || !newPassword){
        return next(
            new AppError("All field are mendatory",400)


        )
    }
    const user = await User.findById(id).select('+password');
    if(!user){
        return next(
            new AppError("User doex not exit",400)
       )
    }
    const isPasswordValid = await user.comparePassword(oldPassword)
    if(!isPasswordValid){
        return next(
            new AppError("Invalid old password",400)
       )
    }
    user.password = newPassword;
    await user.save();
    user.password = undefined;
    res.status(200).json({
        success:true,
        message:'Password change successfull'
    })




}
const updateUser = async (req, res, next)=>{
    const { fullName} = req.body;
    const { id } = req.user.id;
    const user = await User.findById(id);
    if(!user){
        return next(
            new AppError('User does not exists', 400)
        )
    }
    if(req.fullName){
        user.fullName = fullName;

    }
    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"lms",
                width:250,
                height:250,
                gravity:'faces',
                crop:'file'
            });
            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)

            }
            
        } catch (error) {
            return next(
                new AppError (error || 'File not upload please try again',500)
            )
            
        }
    }
    await user.save();
    res.status(200).json({
        success:true,
        message:'file update successfully'
    })


}
export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePasswword,
    updateUser
}


