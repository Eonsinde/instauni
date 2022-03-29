import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Profile = () => {
    let [isPhoto, setIsPhoto] = useState(null);

    return ( 
        <div className='flex justify-around items-center'>
            <div className='user-details'>
                <h2 className='text-3xl font-semibold mb-6'>Ade Sinachi Yusuf</h2>
                <p className='mb-6'>Yusuf.ade@gmail.com</p>
                <p className='mb-6'>400</p>
                <p className='mb-6'>1800332</p>
                <p className=''>Abraham Hall</p>
            </div>
            <figure className='flex flex-col justify-center items-center space-y-3'>
                {
                    !isPhoto
                    ?
                    <div className='bg-gray-100 p-24 rounded-full'></div>
                    :
                    <img className="mx-auto" src={isPhoto} alt="User's Avatar Image" width={'100%'} height={'100%'} />
                }
               
                <Link to='#' className='text-green-500'>Edit</Link>
            </figure>
        </div>
    );
}
 
export default Profile;
