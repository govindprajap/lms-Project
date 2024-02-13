import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';
const initialState = {
    courseData:[]

}
export const getAllCourses = createAsyncThunk("/course/get", async ()=>{
    try {
        const responce = axiosInstance.get("/courses");
        toast.promise(responce, {
            loading:"loading course data...",
            success:"course loaded success",
            error:"failed to get course"
        })
        return (await responce).data.courses;
        
    } catch (error) {
        toast.error(error?.responce?.data?.message)
        
    }
}) 
const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=>{
            if(action.payload){
                console.log(action.payload)
                state.courseData = [...action.payload];

            }
        })

    }


});
export  default courseSlice.reducer