import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout'

import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Slices/AuthSlice';
function Signup(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
       
        email:"",
        password:"",
        
    });
    function handleUserInput(e){
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })

    }
   
    async function onLogin(event){
        event.preventDefault();
        if(!loginData.email || !loginData.password ){
            toast.error("Please fill all the Details")
            return;
            
        }
        
       
        
       

        // dispatch create account action
        const responce = await dispatch(login(loginData));
        // console.log(responce)
        if(responce?.payload?.success)
             navigate('/')
             setLoginData({
            
            email:"",
            password:"",
           
        });
        


    }
    
    
    return(
       <HomeLayout>
        <div className='flex items-center justify-center h-[100vh]'>
            <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_green]'>
                <h1 className='text-center text-2xl font-bold '>Login Page</h1>

                  
                   
                
                 <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font semi-bold '>Email</label>
                   <input className='px-2 py-1 bg-transparent border'
                   type='email'
                   name='email'
                   id='email'
                   onChange={handleUserInput}
                   value={loginData.email}
                   placeholder='Enter your Email' />
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font semi-bold '>Password</label>
                   <input className='px-2 py-1 bg-transparent border'
                   type='password'
                   name='password'
                   id='password'
                   onChange={handleUserInput}
                   value={loginData.password}
                   placeholder='Enter your Password' />
                 </div>
                 <button type = "submit"className='mt-2 bg-yellow-600 hover: bg-yellow-500transition-all ease-in-out duration-300 rounded-sm py-2 fonr semi-bold text-lg'>Login</button>
                 <p className='text-center '>Do not have an Account <Link to="/signup" className='link text-accent cursor-pointer'>Signup</Link>
                 </p>
            </form>
        </div>
       </HomeLayout>
    )

}
export default Signup;