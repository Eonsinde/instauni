import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { fetchUser } from '../services/dash_requests';
import { Modal, Upload, message } from 'antd';
import InstaModal from '../../Modal/Modal';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../constants';
import { ProfileDetailsLoader, ProfileImageLoader } from '../loaders/DashLoaders';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


// use react query
const Profile = () => {
    let [modalOpened, setModalOpened] = useState(false);
    let { user:user_jwt, auth_tokens, appTheme } = useAuth();
    let [updatingProfile, setUpdatingProfile] = useState(false);
    let [uploadingAvatar, setUploadingAvatar] = useState(false);
    let [avatarUploadURL, setAvatarUploadURL] = useState('');

    const [formData, setFormData] = useState({
        image: null,
        email: "",
        username: "",
        reg_no: "",
        level: "",
        gender: "",
        password: "",
        confirm_password: ""
    });

    const { register:RegisterField, handleSubmit:SubmitForm, formState: { errors } } = useForm(); // form validation

    useEffect(() => {  
        document.title = `InstaLife | ${user_jwt.username} | Profile`;
    }, []);

    // fetch authd user
    const { data:actualUser, status, userLoading } = useQuery('user', () => fetchUser(auth_tokens.access, user_jwt.user_id));

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
      
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2; // is less than 2MB
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value.trim()
        }));
    }
                            
    const handleAvatarChange = info => {
        if (info.file.status === 'uploading') {
            setUploadingAvatar(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setUploadingAvatar(false);
                setAvatarUploadURL(imageUrl);
            });
        }
    }
      
    const handleSubmit = () => {
        if (formData.password !== formData.confirm_password) {
            toast.error("Password Don't Match");
        } else {
            const userData = {
                ...formData
            };

            console.log("Submitting", userData);
            // dispatch(register(userData));
        }
    }

    const uploadButton = (
        <div style={{ fontSize: '1.125rem'}}>
          {uploadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    
    return ( 
        <div className='flex flex-col-reverse md:flex-row justify-around items-center'>
            {
                userLoading
                ?
                <>
                    <ProfileDetailsLoader />
                    <ProfileImageLoader />
                </>
                :
                <>
                    <div className='user-details text-center md:text-left text-gray-800 dark:text-white'>
                        <h2 className='text-3xl font-semibold mb-6 text-gray-800 dark:text-white'>Full Name: {(actualUser?.get_fullname === '') ? actualUser?.get_fullname : "Unknown"}</h2>
                        <p className='mb-6'>Email: {actualUser?.email}Put a verified tick</p>
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
                    <figure className='flex flex-col justify-center items-center space-y-3 mb-8 md:mb-0'>
                        {
                            !actualUser?.image
                            ?
                            <div style={{height:'250px', width: '250px'}} className='bg-gray-100 rounded-full'></div>
                            :
                            <img style={{ height: '250px', width: '250px' }} className="mx-auto rounded-full object-cover" src={actualUser?.image} alt={`${actualUser?.username}'s Avatar Img`} />
                        }
                    
                        <Link to='#' className='text-app-green hover:text-app-green' onClick={() => setModalOpened(true)}>Edit</Link>
                    </figure>
                    
                    {/* {modalOpened && <InstaModal className='text-white bg-red-500' setIsOpen={setModalOpened}>Testing this is fan tas tic</InstaModal>} */}
                    <Modal
                        title="Update Profile"
                        centered
                        visible={modalOpened}
                        onCancel={() => setModalOpened(false)}
                        footer={null}
                        bodyStyle={{background: `${(appTheme === 'dark' ? 'rgb(27,27,27)' : '#fff')}`, fontSize: '1.125rem'}}
                    >
                        <form onSubmit={SubmitForm(handleSubmit)} className='flex flex-col px-2 w-full mx-auto'> 
                            <div className='form-sect mb-7 md:mb-3 lg:mb-5 text-center'>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader rounded-full"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={handleAvatarChange}
                                >
                                    {avatarUploadURL ? <img src={avatarUploadURL} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div className='form-sect flex space-x-2 mb-7 md:mb-3 lg:mb-5'>
                                <input 
                                    {...RegisterField("first_name", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                        ${(errors.first_name?.type === 'required' || errors.first_name?.type === 'pattern') ? 'focus:border-red-200 focus:ring-red-400  dark:focus:border-red-200 dark:focus:ring-red-400' : '' } 
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}
                                    onChange={handleChange} 
                                    placeholder='First Name' 
                                />
                                <input 
                                    {...RegisterField('last_name', { maxLength:50, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500
                                        ${errors.last_name?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400 dark:focus:border-red-200 dark:focus:ring-red-400' : '' } 
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}
                                    onChange={handleChange} 
                                    placeholder='Last Name' 
                                />
                            </div>
                            <div className='form-sect flex space-x-2 mb-7 md:mb-3 lg:mb-5'>
                                <input 
                                    {...RegisterField("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                        ${(errors.email?.type === 'required' || errors.email?.type === 'pattern') ? 'focus:border-red-200 focus:ring-red-400  dark:focus:border-red-200 dark:focus:ring-red-400' : '' } 
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}
                                    onChange={handleChange} 
                                    placeholder='Email Address' 
                                />
                                <input 
                                    {...RegisterField('username', { maxLength:50, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500
                                        ${errors.username?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400 dark:focus:border-red-200 dark:focus:ring-red-400' : '' } 
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}
                                    onChange={handleChange} 
                                    placeholder='Username' 
                                />
                            </div>
                            <div className='form-sect flex space-x-2 mb-7 md:mb-3 lg:mb-5'>
                                <input
                                    {...RegisterField('reg_no', { minLength: 7, maxLength: 7, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500
                                        ${(errors.reg_no?.type === 'required' || errors.reg_no?.type === 'minLength' || errors.reg_no?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400 dark:focus:border-red-200 dark:focus:ring-red-400' : '' } 
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}  
                                    onChange={handleChange} placeholder='Registration Number' 
                                />
                                <input
                                    type='number'
                                    {...RegisterField("level", { minLength: 3, maxLength: 3, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500
                                        ${(errors.level?.type === 'required' || errors.level?.type === 'minLength' || errors.level?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400 dark:focus:border-red-200 dark:focus:ring-red-400' : '' } 
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`} 
                                    onChange={handleChange} 
                                    placeholder='Level'
                                />
                            </div>
                            <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                                <select 
                                    {...RegisterField('gender', { required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500
                                        ${errors.gender?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400 dark:focus:border-red-200 dark:focus:ring-red-400' : '' }
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`} 
                                    onChange={handleChange}
                                >
                                    <option className='dark:bg-app-dark-opacity' value=''>Gender</option>
                                    <option className='dark:bg-app-dark-opacity' value='m'>Male</option>
                                    <option className='dark:bg-app-dark-opacity' value='f'>Female</option>
                                </select>
                            </div>
                            <div className='form-sect flex space-x-2 mb-7 md:mb-3 lg:mb-5'>
                                <input 
                                    type='password' 
                                    {...RegisterField("password", { maxLength: 255, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500
                                        ${(errors.password?.type === 'required' || errors.level?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400 dark:focus:border-red-200 dark:focus:ring-red-400' : '' }
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`} 
                                    onChange={handleChange} 
                                    placeholder='Password'
                                />
                                <input 
                                    type='password' 
                                    {...RegisterField("confirm_password", { maxLength: 255, required: true })} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm 
                                        focus:border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500
                                        ${errors.confirm_password?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400 dark:focus:border-red-200 dark:focus:ring-red-400' : '' }
                                        transition ease-in-out delay-150 dark:bg-transparent dark:text-white`} 
                                    onChange={handleChange} 
                                    placeholder='Confirm Password'
                                />
                            </div>
                            <button 
                                disabled={updatingProfile ? true : false}
                                type='submit' 
                                className={`${!updatingProfile ? 'bg-app-green' : 'bg-app-green-opacity animate-pulse'} text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150`}
                            >
                                {updatingProfile ? 'Submitting' : 'Submit Changes'}
                            </button>
                        </form>
                    </Modal>
                </>
            }
        </div>
    );
}
 
export default Profile;
