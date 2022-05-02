import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../assets/images/pnf.jpg'


const PageNotFound = () => {
    useEffect(() => {  
        document.title = `InstaLife | Page Not Found`;
    }, []);


    return (
        <> 
        <header style={{height: '18vh'}} className="">
            <div className='container h-full mx-auto flex justify-center items-center relative'>
                <Link to='/' className='text-gray-800 md:text-5xl text-4xl font-semibold hover:text-gray-800'>Insta<span className="text-app-green">life</span></Link>
            </div>
        </header>
        <section className='container mx-auto h-82vh flex md:flex-row md:justify-center md:items-start flex-col-reverse'>
            <div className='text-gray-800 md:basis-1/2 basis-full h-3/4 md:space-y-6 space-y-4 flex flex-col items-start md:justify-center justify-start md:text-left text-center'>
                <p className='text-app-green text-lg w-full'>404</p>
                <h1 className='md:text-5xl text-4xl font-bold w-full'>Page Not Found</h1>
                <p className='text-lg w-full'>
                    We are unable to find the page you are looking for.<br/>
                    Make sure you check the link properly. You can return<br/>
                    back to the homepage with the button below<br/>
                </p>
                <Link to='/' className='bg-app-green py-2 px-2 text-white hover:text-white text-lg text-center inline-block lg:w-1/3 md:w-2/5 w-2/5 rounded-md md:mx-0 mx-auto'>Back to Home</Link>
            </div>
            <div className='md:basis-1/2 basis-full h-3/4 flex md:justify-end items-center justify-center md:mb-0 mb-6'>
                <img src={errorImg} alt='Page Not Found Img' className='md:w-auto lg:w-5/6 h-auto w-8/12' />
            </div>
        </section>
        </>
    );
}
 
export default PageNotFound;