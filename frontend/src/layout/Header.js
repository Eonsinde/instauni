import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'


const Header = () => {
    let [user, setUser] = useState({
        username: "Eonsinde",
        isAuth: false,
        email: 'olasinde.eon@gmail.com'
    })

    return (  
        <header className="py-16">
            <div className='container mx-auto flex justify-center items-center relative'>
                <Link to='/' className='text-gray-800 text-5xl font-semibold'>Insta<span className="text-green-500">life</span></Link>
                {
                    !user.isAuth
                    ?
                    <></>
                    :
                    <div className='flex items-center absolute left-3/4'>
                        <Link to='/dashboard/user/profile' className='flex flex-row justify-center items-center space-x-3 text-gray-800'>
                            <span className='text-2xl'><IoIosArrowDown /></span>
                            <BsPersonCircle className='text-4xl' />
                        </Link>
                    </div>
                } 
            </div>
        </header>
    );
}
 
export default Header;