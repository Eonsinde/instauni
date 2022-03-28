import React from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../Assets/images/login.png'


const Login = () => {
    return (
        <section className='py-28'>
            <div className='container flex justify-center items-center mx-auto h-96'>
                <div className='hidden md:block md:px-3 md:basis-1/2'>
                    <img className="mx-auto" src={loginImg} alt="" width={'100%'} height={'100%'} />
                </div>
                <div className='basis-full md:basis-1/2'>
                    <form onSubmit={e => e.preventDefault()} className='flex flex-col px-2 w-10/12 md:w-9/12 lg:w-7/12 mx-auto'> 
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Email Or Registration Number' />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Password'/>
                        </div>
                        <button type='submit' className='bg-green-500 text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200'>Log In</button>
                        <p className='text-center mt-7 md:mt-3 lg:mt-6'>Don't have an account? <Link to='/register' className='text-green-500'>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
}
 
export default Login;