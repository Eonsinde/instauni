import React from 'react';
import { Link } from "react-router-dom"
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'


const Header = () => {
    return (  
        <header className="py-16">
            <div className='container mx-auto flex justify-between '>
                <div className=''>
                </div>
                <h3 className='text-gray-800 text-5xl font-semibold'>Insta<span className="text-green-500">life</span></h3>
                <div className='flex items-center'>
                    <Link to='/home' className='flex flex-row justify-center items-center space-x-3 text-gray-800'>
                        <span className='text-2xl'><IoIosArrowDown /></span>
                        <BsPersonCircle className='text-4xl ' />
                    </Link>
                </div>
            </div>
        </header>
    );
}
 
export default Header;