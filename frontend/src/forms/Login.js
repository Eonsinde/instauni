import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../Assets/images/login.png'


const Login = () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleSubmit = e => {
        // before A
        console.log("Make AJAX request to submit username and password to server", username, password);
    }

    return (
        <>
        <header style={{height: '18vh'}} className="">
            <div className='container h-full mx-auto flex justify-center items-center relative'>
                <Link to='/' className='text-gray-800 text-5xl font-semibold hover:text-gray-800'>Insta<span className="text-app-green">life</span></Link>
            </div>
        </header>
        <section className='py-28'>
            <div className='container flex justify-center items-center mx-auto h-96'>
                <div className='hidden md:block md:px-3 md:basis-1/2'>
                    <img className="mx-auto" src={loginImg} alt="" width={'100%'} height={'100%'} />
                </div>
                <div className='basis-full md:basis-1/2'>
                    <form onSubmit={handleSubmit} className='flex flex-col px-2 w-10/12 md:w-9/12 lg:w-7/12 mx-auto'> 
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' onChange={e => setUsername(e.target.value)} className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200 transition ease-in-out delay-150' placeholder='Email Or Registration Number' />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' onChange={e => setPassword(e.target.value)} className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200 transition ease-in-out delay-150' placeholder='Password'/>
                        </div>
                        <button type='submit' className='bg-app-green text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150'>Log In</button>
                        <p className='text-center mt-7 md:mt-3 lg:mt-6'>Don't have an account? <Link to='/register' className='text-app-green'>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
}
 
export default Login;