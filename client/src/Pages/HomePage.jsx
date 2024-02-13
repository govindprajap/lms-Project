import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage(){
    return(
        <HomeLayout>
        <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
            <div className="w-1/2 space-y-6">
                <h1 className="text-4xl font-semibold">
                    Find out best
                     <span className="text-yellow-500 font-bold">Online Courses</span>
                </h1>
                <p className="text-xl text-gray-200">
                    We have a large library of courses taught by highly skilled and qualified faculties at a very affortable cost   
                </p>
                <div className="space-x-6">
                    <Link to='/courses'>
                        <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-800 duration-300 transition-all ease-in-out">Explore Courses</button>
                    </Link>
                    <Link to='/contact'>
                        <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-800 duration-300 transition-all ease-in-out">Contact Us</button>
                    </Link>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <img 
                style={{
                    filter:"drop-shadow(10px 10px 10px rgb(0,0,0));",
                    }}
               
                src="https://contentstatic.techgig.com/photo/74548080/4-essential-skills-every-net-developer-must-possess.jpg?67629" alt=""
                  className="rounded-full h-72 w-72"/>
            </div>
        </div>
    </HomeLayout>

    )
    

}
export default HomePage;