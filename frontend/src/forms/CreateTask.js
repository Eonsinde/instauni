import React from 'react';
import { Link } from 'react-router-dom';
import registerImg from '../Assets/images/register.png'


const CreateTask = () => {
    return ( 
        <section className='py-28'>
            <div className='container flex justify-center items-center mx-auto h-96'>
                {/* <div className='hidden md:block md:px-3 md:basis-1/2'>
                    <img className="mx-auto" src={registerImg} alt="" width={'100%'} height={'100%'} />
                </div> */}
                <div className='basis-full'>
                    <form onSubmit={e => e.preventDefault()} className='flex flex-col px-2 w-10/12 md:w-8/12 lg:w-5/12 mx-auto'> 
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Full Name' />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Room Number For Delivery' />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Detailed Location' />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Buy/Collect/Get' />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='text' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Item'/>
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input type='number' className='p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200' placeholder='Price Offer'/>
                        </div>
                        <button type='submit' className='bg-green-500 text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200'>Create Task</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
 
export default CreateTask;