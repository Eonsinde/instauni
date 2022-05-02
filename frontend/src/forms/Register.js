import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import { register, reset } from '../reducers/auth/authSlice'
import registerImg from '../assets/images/register.png'


const Register = () => {
    useEffect(() => {  
        document.title = `InstaLife | Register`;
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        reg_no: "",
        level: "",
        gender: "",
        password: "",
        confirm_password: ""
    });

    const { register:RegisterField, handleSubmit:SubmitForm, formState: { errors } } = useForm(); // form validation

    const navigate = useNavigate();
    const dispatch  = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (user || isSuccess || message.message === "success"){
            navigate('/login');
            toast.success("Account has been registered - Login to continue");
            dispatch(reset());
        }
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value.trim()
        }));
    }

    const handleSubmit = () => {
        if (formData.password !== formData.confirm_password) {
            toast.error("Password Don't Match");
        } else {
            const userData = {
                ...formData
            };

            dispatch(register(userData));
        }
    }

    if (user || isSuccess)
        return <Navigate to='/' />;
    return ( 
        <>
        <header style={{height: '18vh'}} className="">
            <div className='container h-full mx-auto flex justify-center items-center relative'>
                <Link to='/' className='text-gray-800 md:text-5xl text-4xl font-semibold hover:text-gray-800'>Insta<span className="text-app-green">life</span></Link>
            </div>
        </header>
        <section className='h-82vh overflow-hidden py-2'>
            <div className='container flex justify-center items-center mx-auto'>
                <div className='hidden md:block md:px-3 md:basis-1/2'>
                    <img className="mx-auto" src={registerImg} alt="" width={'100%'} height={'100%'} />
                </div>
                <div className='basis-full md:basis-1/2'>
                    <form onSubmit={SubmitForm(handleSubmit)} className='flex flex-col px-2 w-10/12 md:w-9/12 lg:w-7/12 mx-auto'> 
                         <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input 
                                {...RegisterField("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, required: true })} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm 
                                    focus:border-gray-200 focus:ring-4 focus:ring-gray-200  
                                    ${(errors.email?.type === 'required' || errors.email?.type === 'pattern') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150`}
                                onChange={handleChange} 
                                placeholder='Email Address' 
                            />
                            {/* {  (errors.email?.type === 'pattern') && toast.error("Email: Required Field & must be valid") } */}
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input 
                                {...RegisterField('username', { maxLength:50, required: true })} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm 
                                    focus:border-gray-200 focus:ring-4 focus:ring-gray-200 
                                    ${errors.username?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150`}
                                onChange={handleChange} 
                                placeholder='Username' 
                            />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input
                                {...RegisterField('reg_no', { minLength: 7, maxLength: 7, required: true })} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm 
                                    focus:border-gray-200 focus:ring-4 focus:ring-gray-200 
                                    ${(errors.reg_no?.type === 'required' || errors.reg_no?.type === 'minLength' || errors.reg_no?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 `}  
                                onChange={handleChange} placeholder='Registration Number' 
                            />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input
                                {...RegisterField("level", { minLength: 3, maxLength: 3, required: true })} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm 
                                    focus:border-gray-200 focus:ring-4 focus:ring-gray-200 
                                    ${(errors.level?.type === 'required' || errors.level?.type === 'minLength' || errors.level?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150  `} 
                                onChange={handleChange} 
                                placeholder='Level'
                            />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <select 
                                {...RegisterField('gender', { required: true })} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm 
                                    focus:border-gray-200 focus:ring-4 focus:ring-gray-200 
                                    ${errors.gender?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400' : '' }
                                    transition ease-in-out delay-150`} 
                                onChange={handleChange}
                            >
                                <option value=''>Gender</option>
                                <option value='m'>Male</option>
                                <option value='f'>Female</option>
                            </select>
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input 
                                type='password' 
                                {...RegisterField("password", { maxLength: 255, required: true })} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm 
                                    focus:border-gray-200 focus:ring-4 focus:ring-gray-200 
                                    transition ease-in-out delay-150  ${(errors.password?.type === 'required' || errors.level?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } `} 
                                onChange={handleChange} 
                                placeholder='Password'
                            />
                        </div>
                        <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                            <input 
                                type='password' 
                                {...RegisterField("confirm_password", { maxLength: 255, required: true })} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm 
                                    focus:border-gray-200 focus:ring-4 focus:ring-gray-200 
                                    transition ease-in-out delay-150  ${errors.confirm_password?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400' : '' } `} 
                                onChange={handleChange} 
                                placeholder='Confirm Password'
                            />
                        </div>
                        <button 
                            disabled={isLoading ? true : false}
                            type='submit' 
                            className={`${!isLoading ? 'bg-app-green' : 'bg-app-green-opacity animate-pulse'} text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150`}
                        >
                            {isLoading ? 'Submitting' : 'Register'}
                        </button>
                        <p className='text-center mt-7 md:mt-3 lg:mt-6'>Already Registered? <Link to='/login' className='text-app-green hover:text-app-green'>Sign In</Link></p>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
}
 
export default Register;