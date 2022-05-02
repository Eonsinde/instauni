import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { login, reset } from '../reducers/auth/authSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import loginImg from '../assets/images/login.png';


const Login = () => {
    useEffect(() => {  
        document.title = `InstaLife | Login`
    }, []);

    let [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { register:RegisterField, handleSubmit:SubmitForm, formState: { errors } } = useForm(); // form validation

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch  = useDispatch();

    const from = location.state?.from?.pathname;

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError){
            toast.error(message);
            dispatch(reset());
        }

        if (user || isSuccess){
            if (from) // navigate to protected view 
                navigate(from, { replace: true });
            toast.success(`Logged In: Welcome ${user?.username}`);
            dispatch(reset());
        }
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = () => {
        // login user
        dispatch(login(formData));
    }

    // we can also use navigate here incase of any issues
    if (user || isSuccess)
        navigate('/');
    return (
            <>
            <header style={{height: '18vh'}} className="">
                <div className='container h-full mx-auto flex justify-center items-center relative'>
                    <Link to='/' className='text-gray-800 md:text-5xl text-4xl font-semibold hover:text-gray-800'>Insta<span className="text-app-green">life</span></Link>
                </div>
            </header>
            <section className='py-28'>
                <div className='container flex justify-center items-center mx-auto h-96'>
                    <div className='hidden md:block md:px-3 md:basis-1/2'>
                        <img className="mx-auto" src={loginImg} alt="" width={'100%'} height={'100%'} />
                    </div>
                    <div className='basis-full md:basis-1/2'>
                        <form onSubmit={SubmitForm(handleSubmit)} className='flex flex-col px-2 w-10/12 md:w-9/12 lg:w-7/12 mx-auto'> 
                            <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                                <input 
                                    type='text' 
                                    {...RegisterField("username", {required: true, maxLength: 50})} 
                                    onChange={handleChange} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 
                                            focus:ring-4 focus:ring-gray-200  ${errors.username?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                            transition ease-in-out delay-150`} 
                                    placeholder='Username'  
                                />
                            </div>
                            <div className='form-sect mb-7 md:mb-3 lg:mb-5'>
                                <input 
                                    type='password' 
                                    {...RegisterField("password", { required: true, maxLength: 255 })} 
                                    onChange={handleChange} 
                                    className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 
                                            focus:ring-4 focus:ring-gray-200  ${errors.password?.type === 'required' ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                            transition ease-in-out delay-150`} 
                                    placeholder='Password'
                                />
                            </div>
                            <button 
                                disabled={isLoading ? true : false}
                                type='submit' 
                                className={`${!isLoading ? 'bg-app-green' : 'bg-app-green-opacity animate-pulse'} text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150`}
                            >
                                {isLoading ? 'Submitting' : 'Login'}
                            </button>
                            <p className='text-center mt-7 md:mt-3 lg:mt-6'>Don't have an account? <Link to='/register' className='text-app-green hover:text-app-green'>Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </section>
            </>
        );
}
 
export default Login;