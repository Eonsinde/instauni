import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { MdOutlineManageSearch } from 'react-icons/md'
import { Link } from 'react-router-dom';
import findImg from '../Assets/images/find_obj.png'

const Objectives = () => {
    return ( 
        <section className='obj-section'>
            <div className='container mx-auto'>
                <div className='obj-wrapper flex flex-wrap flex-col md:flex-row justify-around my-16'>
                    <div className='text-center basis-full mb-14 md:mb-8'>
                        <h4 className='font-semibold text-2xl'>I want to</h4>
                    </div>
                    <div className='obj basis-1/2 flex flex-col items-center justify-center text-center mb-20 md:mb-0'>
                        <Link to='/create-task' className='border-2 border-gray-700 rounded-full p-4 hover:bg-green-500 hover:border-green-500 hover:ring-8 hover:ring-green-200 transition'>
                            <img className="mx-auto h-48 w-48 md:h-42 md:w-42 lg:h-72 lg:w-72" src={findImg} alt="" />
                        </Link>
                        {/* <BsPlusCircle /> */}
                        <div className='objective-content flex flex-col items-center justify-center mt-8'>
                            <h4 className='objective-caption text-green-500 text-lg mb-3 font-semibold'>Create</h4>
                            <p className='objective-text'>
                                Post a microjob for individuals <br/>around the school to find and deliver
                            </p>
                        </div>
                    </div>
                    <div className='obj basis-1/2 flex flex-col items-center justify-center text-center mb-20 md:mb-0'>
                        <Link to='/create-task' className='border-2 border-gray-700 rounded-full p-4 hover:bg-green-500 hover:border-green-500 hover:ring-8 hover:ring-green-200 transition'>
                            <img className="mx-auto h-48 w-48 md:h-42 md:w-42 lg:h-72 lg:w-72" src={findImg} alt="" />
                        </Link>
                        {/* <MdOutlineManageSearch className='text-9xl' /> */}
                        <div className='objective-content flex flex-col items-center justify-center mt-8'>
                            <h4 className='objective-caption text-green-500 text-lg mb-3 font-semibold'>Find</h4>
                            <p className='objective-text'>
                                Search for microjobs posted<br/> by individuals around the school
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Objectives;