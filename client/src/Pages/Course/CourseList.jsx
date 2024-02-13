import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import HomeLayout from '../../Layouts/HomeLayout';


function CourseList() {
    const dispatch = useDispatch();
    const {courseData} = useSelector((state)=>state.course);
    async function loadCourse(){
        await dispatch(getAllCourses())

    }
    useEffect(()=>{
        loadCourse()

    },[])
  
  return (
     <HomeLayout>
        <div className='min-h-[90vh] pt-12 pl-20 flex flexcol gap-10 text-white'>
            <h1>Explore the course made by 
                <span className='font-bold text-yellow-500'>
                    Industry export
                </span>
                <div className='flex flex-wrap mb-10 gap-14'></div>
            </h1>
           
        </div>
     </HomeLayout>
  )
}

export default CourseList