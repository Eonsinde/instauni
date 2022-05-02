import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { ProfileDetailsLoader, ProfileImageLoader } from './loaders/DashLoaders';


const Profile = () => {
    let { user:user_jwt, auth_tokens } = useAuth();
    let [actualUser, setUser] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {  
        document.title = `InstaLife | Username's | Profile`;
    }, []);

    useEffect(() => {  
        setIsLoading(true);

        const config = {
            headers: {
                'Authorization': `JWT ${auth_tokens.access}`,
                'Content-Type': 'application/json'
            }
        };

        // make request to get user
        axios.get(`${BASE_URL}/api/auth/user/${user_jwt.user_id}/`, config)
            .then(res => {
                setUser(res.data);
                console.log(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error:", err);
            });
    }, []);

    return ( 
        <div className='flex flex-col-reverse md:flex-row justify-around items-center'>
            {
                isLoading
                ?
                <>
                    <ProfileDetailsLoader />
                    <ProfileImageLoader />
                </>
                :
                <>
                    <div className='user-details text-center md:text-left'>
                        <h2 className='text-3xl font-semibold mb-6'>Full Name: {(actualUser?.get_fullname === '') ? actualUser?.get_fullname : "Unknown"}</h2>
                        <p className='mb-6'>Email: {actualUser?.email}</p>
                        <p className='mb-6'>Username: {actualUser?.username}</p>
                        <p className='mb-6'>Gender: {actualUser?.get_gender}</p>
                        <p className='mb-6'>Level: {actualUser?.level}</p>
                        <p className='mb-6'>Reg No: {actualUser?.reg_no}</p>
                        <p className='mb-6'>Is Verified: {actualUser?.isVerified ? "True" : "False"}</p>
                        <p className='mb-6'>Has Wallet: {actualUser?.hasWallet ? "True" : "False"}</p>
                        <p className='mb-6'>Profile Completion: {actualUser?.is_profile_completed && `${actualUser.is_profile_completed}%`}</p>
                        <p className='mb-6'>Date Of Birth: {actualUser?.date_of_birth ? actualUser?.date_of_birth : "Unknown"}</p>
                        <p className='mb-6'>Date Joined: {actualUser?.date_joined}</p>
                    </div>
                    <figure className='bg-slate- flex flex-col justify-center items-center space-y-3 mb-8 md:mb-0'>
                        {
                            !actualUser?.image
                            ?
                            <div className='bg-gray-100 p-24 rounded-full'></div>
                            :
                            <img className="mx-auto" src={actualUser?.image} alt={`${actualUser?.username}'s Avatar Img`} width={'100%'} height={'100%'} />
                        }
                    
                        <Link to='#' className='text-app-green hover:text-app-green'>Edit</Link>
                    </figure>
                </>
            }
        </div>
    );
}
 
export default Profile;
