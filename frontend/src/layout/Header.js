import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'


// Note: add quick links for navigation to pages like Objectives

const Header = () => {
    let [user, setUser] = useState({
        username: "Eonsinde",
        isAuth: false,
        email: 'olasinde.eon@gmail.com'
    })

    return (  
        <header style={{...styles.header}} className="">
            <div className='container h-full mx-auto flex justify-center items-center relative'>
                <Link to='/home' className='text-gray-800 text-5xl font-semibold'>Insta<span className="text-app-green">life</span></Link>
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

const styles = {
    header: {
        height: '18vh'
    }
}
 
export default Header;