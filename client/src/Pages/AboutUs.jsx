import HomeLayout from "../Layouts/HomeLayout";
import CarosuelSlide from "../components/CarosuelSlide";

function AboutUs(){
    const celebrities = [
        {
          title:"Bhimrao Ambedhakar",
          description:"Education is the most powerfull tools you can use to change the world",
          image:"https://i.pinimg.com/originals/7f/d1/b2/7fd1b2eb90fba026d533cae69c3fc5a7.jpg",
          slideNumber:1
        },
        {
            title:"National Mandela",
            description:"Education is the most powerfull tools you can use to change the world",
            image:"https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/06/10213938/Nelson-Mandela-Education.jpg",
            slideNumber:2
          },
          {
            title:"Newton",
            description:"Education is the most powerfull tools you can use to change the world",
            image:"https://images.nationalgeographic.org/image/upload/v1638890068/EducationHub/photos/isaac-newton-who-he-was-why-google-apples-are-falling.jpg",
            slideNumber:3
          },
          {
            title:"Eistein",
            description:"Education is the most powerfull tools you can use to change the world",
            image:"https://hips.hearstapps.com/hmg-prod/images/gettyimages-3091504.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
            slideNumber:4
          },
          {
            title:"Dr Rajendra Prashad",
            description:"Education is the most powerfull tools you can use to change the world",
            image:"https://gumlet.assettype.com/barandbench%2F2022-01%2F0f042831-0f77-4a8d-8012-93b589f166c8%2FDr__Prasad.jpeg?auto=format%2Ccompress&fit=max&w=1200",
            slideNumber:5
          }
    ]
    return(
     <HomeLayout>
     <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
            <section className="w-1/2 space-y-10">
                <h1 className="text-5xl text-yellow-500 font-semibold">Affortable and Quality Education</h1>
                <p className="text-xl text-gray-200">
                    Our goal is provide the affortable and quality education to the world.
                    We are providing plateform for aspiring teachers and student to share 
                    their skills ,creativity and knowledge to each other to empower
                     and constribute in the growth and wellness of mankind. 
                </p>

            </section>
            <div className="w-1/2 ">
                <img
                id="text1"
                style={{
                    filter:"drop-shadow(0px 10px 10px rgb(0,0,0));"
                }}
                alt="aboutImage"
                 src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_640.png" className="w-[400px] h-[400px] drop-shadow-sm -2xl"/>
            </div>
        </div>
        <div className="carousel w-1/2 my-16 m-auto">
            {celebrities && celebrities.map(celebrty=> (<CarosuelSlide{...celebrty} key={celebrty.slideNumber} totalSlide={celebrities.length}/>))}
            <CarosuelSlide/>
   
   
  
  
</div>
        
</div>
  </HomeLayout>
  ) 
  }
  export default AboutUs;

  



    
    
  