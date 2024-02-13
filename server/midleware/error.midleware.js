const errorMidelware = (err,req,res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went to wrong";
    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack:err.stack
    })

}
export default errorMidelware;