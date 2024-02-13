import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLeacturesByCourseId, removeCourse, updateCourse } from "../controller/course.controller.js";
import { authorizeSubscriber, authorizedRoles, isLoggedIn } from "../midleware/auth.midleware.js";
import upload from "../modules/multer.midleware.js";

const router = Router();
router.get('/')
.get(getAllCourses)
.post(
    isLoggedIn,
   authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
    )

router.get('/:id')
.get(isLoggedIn , authorizeSubscriber,getLeacturesByCourseId)
.put(

    isLoggedIn,
    authorizedRoles('ADMIN'),
    updateCourse
    )
.delete(
    isLoggedIn,
    authorizedRoles('ADMIN'),

    removeCourse
    )
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCourseById
)    
export default router;

