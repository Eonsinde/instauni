import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const CreateTask = () => {
    return ( 
        <motion.div
            initial={{ translateX: '100%' }} 
            animate={{ translateX: 0}} 
            exit={{ translateX: '100%' }}
            transition={{ duration: 0.5 }}
        >
        <section className='py-28'>
            <div className='container flex justify-center items-center mx-auto h-96'>
                <div className='basis-full'>
                    <form onSubmit={e => e.preventDefault()} className='flex flex-col px-2 w-10/12 md:w-8/12 lg:w-5/12 mx-auto'> 
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input type='text' className='p-3 mb-1 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200 transition ease-in-out delay-150' placeholder='Full Name' />
                            <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Person to delivery to(if you - write your info)</p>
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <textarea style={{height:'100px'}} className='p-3 mb-1 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200 transition ease-in-out delay-150'  placeholder="Write Objective/Task"></textarea>
                            <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Detailed description of task, like the location of the items</p>
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input type='text' className='p-3 mb-1 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200 transition ease-in-out delay-150' placeholder="Item's Location" />
                            <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Where item is located</p>

                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input type='text' className='p-3 mb-1 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200 transition ease-in-out delay-150' placeholder="Delivery Location" />
                            <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Where item should be delivered</p>

                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input type='number' className='p-3 mb-1 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 focus:ring-4 focus:ring-gray-200 transition ease-in-out delay-150' placeholder='Price Offer'/>
                            <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Price for task fulfillment</p>
                        </div>
                        <button type='submit' className='bg-app-green text-white p-3 mt-0 md:mt-2 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150'>Create Task</button>
                        <p className='text-center mt-7 md:mt-3 lg:mt-6 text-gray-800'>Return to <Link to='/objectives' className='text-app-green'>Objectives</Link></p>
                    </form>
                </div>
            </div>
        </section>
        </motion.div>
    );
}
 
export default CreateTask;