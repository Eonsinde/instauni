import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../Assets/images/pnf.jpg'


const PageNotFound = () => {
    return (
        <> 
        <header style={{height: '18vh'}} className="">
            <div className='container h-full mx-auto flex justify-center items-center relative'>
                <Link to='/' className='text-gray-800 text-5xl font-semibold hover:text-gray-800'>Insta<span className="text-app-green">life</span></Link>
            </div>
        </header>
        <section className='container flex items-start mx-auto h-82vh'>
            <div className='text-gray-800 basis-1/2 h-3/4 space-y-6 flex flex-col items-start justify-center'>
                <p className='text-app-green text-lg'>404</p>
                <h1 className='text-5xl font-bold'>Page Not Found</h1>
                <p className='text-lg'>
                    We are unable to find the page you are looking for.<br/>
                    Make sure you check the link properly. You can return<br/>
                    back to the homepage with the button below<br/>
                </p>
                <Link to='/' className='bg-app-green py-2 px-2 text-white text-lg text-center inline-block md:w-2/5 lg:w-1/3 rounded-md'>Back to Home</Link>
            </div>
            <div className='basis-1/2 h-3/4 flex justify-end items-center'>
                <img src={errorImg} alt='Page Not Found Img' className='md:w-auto lg:w-5/6 h-auto' />
            </div>
        </section>
        </>
    );
}
 
export default PageNotFound;