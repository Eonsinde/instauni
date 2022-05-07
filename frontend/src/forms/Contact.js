import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify'
import { BASE_URL } from '../constants';


const Contact = () => {
    useEffect(() => {  
        document.title = `InstaLife | Reach Us`;
    }, []);


    let [isLoading, setIsLoading] = useState(false);
    let [formData, setFormData] = useState({
        "full_name": "",
        "email": "",
        "message": "",
    });

    const { register:RegisterField, handleSubmit:SubmitForm, formState: { errors } } = useForm(); // form validation

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }

    const handleSubmitRequest = async () => {
        try{
            const resp = await axios.post(`${BASE_URL}/api/contact`, formData);

            if (resp.status === 201){ // created
                setIsLoading(false);
                toast.success(`Submitted Successfully`);
                setTimeout(() => { setFormData({ full_name: '', email: '', message: '' }) }, 1000);
                return resp;
            }else{
                setIsLoading(false);
                toast.error(`Failed to Submit - 1`);
            }
        } catch(error){
            setIsLoading(false);
            toast.success(`Failed to Submit - 2`);
        }
    }

    const handleSubmit = () => {
        setIsLoading(true);
        handleSubmitRequest();
    }


    return ( 
        <motion.div
            initial={{ translateX: '-100%' }} 
            animate={{ translateX: 0}} 
            exit={{ translateX: '-100%' }}
            transition={{ duration: 0.5 }}
        >
        <section className='overflow-hidden'>
            <div className='container mx-auto h-full'>
                <div className='h-full flex flex-col justify-start items-center mt-20'>
                    <header className='text-center mb-10 px-4 sm:px-0'>
                        <h1 className='font-bold lg:text-5xl text-4xl mb-4 dark:text-white'>Contact Us</h1>
                        <p className='text-lg dark:text-slate-200'>Have any questions, complaints or suggestions?<br/>Contact us and will get back to you within 24 hours</p>
                    </header>
                    <form onSubmit={SubmitForm(handleSubmit)} className='flex flex-col px-2 w-10/12 md:w-8/12 lg:w-5/12 mx-auto'> 
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text' 
                                {...RegisterField("full_name", {required: true, maxLength: 100})} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.full_name?.type === 'required' || errors.full_name?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}
                                value={formData.full_name}     
                                placeholder='Full Name *' 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Person to delivery to(if you - write your info)</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text' 
                                {...RegisterField("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, required: true })} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.email?.type === 'required' || errors.email?.type === 'pattern') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}  
                                value={formData.email}   
                                placeholder="Email *" 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Where item is located</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <textarea 
                                style={{maxHeight:'150px', minHeight:'150px'}}
                                {...RegisterField("message", {required: true, maxLength: 450})} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.message?.type === 'required' || errors.message?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}   
                                value={formData.message}
                                placeholder="What can we help you with? *"
                            ></textarea>
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Detailed description of task, like the location of the items</p> */}
                        </div>
                        <button 
                            disabled={isLoading ? true : false}
                            type='submit' 
                            className={`${!isLoading ? 'bg-app-green' : 'bg-app-green-opacity animate-pulse'} text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150`}
                        >
                            {isLoading ? 'Submitting' : 'Submit'}
                        </button>
                        {/* <p className='text-center mt-7 md:mt-3 lg:mt-6 text-gray-800'>Return to <Link to='/objectives' className='text-app-green hover:text-app-green'>Objectives</Link></p> */}
                    </form>
                </div>
            </div>
        </section>
        </motion.div>
    );
}
 
export default Contact;