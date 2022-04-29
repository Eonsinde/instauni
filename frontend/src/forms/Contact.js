import {useState } from 'react';
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';


const Contact = () => {
    let [formData, setFormData] = useState({
        "full_name": "",
        "email": "",
        "title": "",
        "message": "",
    });

    const { register:RegisterField, handleSubmit:SubmitForm, formState: { errors } } = useForm(); // form validation

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }

    const handleSubmit = () => {

    }


    return ( 
        <motion.div
            initial={{ translateX: '-100%' }} 
            animate={{ translateX: 0}} 
            exit={{ translateX: '-100%' }}
            transition={{ duration: 0.5 }}
        >
        <section className='h-88vh overflow-hidden'>
            <div className='container mx-auto h-full'>
                <div className='h-full flex justify-center items-start lg:mt-28 mt-28'>
                    <form onSubmit={SubmitForm(handleSubmit)} className='flex flex-col px-2 w-10/12 md:w-8/12 lg:w-5/12 mx-auto'> 
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text' 
                                {...RegisterField("full_name", {required: true, maxLength: 100})} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200  ${(errors.full_name?.type === 'required' || errors.full_name?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150`}   
                                placeholder='Full Name *' 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Person to delivery to(if you - write your info)</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text' 
                                {...RegisterField("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, required: true })} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200  ${(errors.email?.type === 'required' || errors.email?.type === 'pattern') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150`}    
                                placeholder="Email *" 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Where item is located</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text' 
                                {...RegisterField("title", {required: true, maxLength: 100})} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200  ${(errors.title?.type === 'required' || errors.title?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150`}   
                                placeholder="Title *" 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Where item should be delivered</p> */}

                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <textarea 
                                style={{maxHeight:'100px'}}
                                {...RegisterField("message", {required: true, maxLength: 450})} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200  ${(errors.message?.type === 'required' || errors.message?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150`}   
                                placeholder="Message *"
                            ></textarea>
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Detailed description of task, like the location of the items</p> */}
                        </div>
                        <button type='submit' className='bg-app-green text-white p-3 mt-0 md:mt-2 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150'>Submit</button>
                        {/* <p className='text-center mt-7 md:mt-3 lg:mt-6 text-gray-800'>Return to <Link to='/objectives' className='text-app-green hover:text-app-green'>Objectives</Link></p> */}
                    </form>
                </div>
            </div>
        </section>
        </motion.div>
    );
}
 
export default Contact;