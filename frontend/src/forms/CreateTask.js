import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';


const CreateTask = () => {
    useEffect(() => {  
        document.title = `InstaLife | Create Task`;
    }, []);

    let [isLoading, setIsLoading] = useState(false);
    let [formData, setFormData] = useState({
        "recipient_name": "",
        "detail": "",
        "delivery_location": "",
        "item_location": "",
        "price_offer": "",
    });
    
    const { register:RegisterField, handleSubmit:SubmitForm, formState: { errors } } = useForm(); // form validation

    const handleChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value.trim()
        }));
    }

    const handleSubmit = () => {
        // on submit - clear form data
    }

    return ( 
        <motion.div
            initial={{ translateX: '100%' }} 
            animate={{ translateX: 0}} 
            exit={{ translateX: '100%' }}
            transition={{ duration: 0.5 }}
        >
        <section className='overflow-hidden'>
            <div className='container mx-auto h-full'>
                <div className='h-full flex flex-col justify-start items-center mt-20'>
                    <header className='text-center mb-10  px-4 sm:px-0'>
                        <h1 className='font-bold lg:text-5xl text-4xl mb-4 dark:text-white'>Create Microjob</h1>
                        <p className='text-lg dark:text-slate-200'>Post a micrjob for individuals around <br />the school to find and deliver</p>
                    </header>
                    <form onSubmit={SubmitForm(handleSubmit)} className='flex flex-col px-2 w-10/12 md:w-8/12 lg:w-5/12 mx-auto'> 
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text'
                                {...RegisterField("recipient_name", {required: true, maxLength: 100})} 
                                onChange={handleChange} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.recipient_name?.type === 'required' || errors.recipient_name?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}  
                                value={formData.recipient_name}
                                placeholder='Full Name *' 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Person to delivery to(if you - write your info)</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <textarea 
                                style={{maxHeight:'100px', minHeight:'80px',}} 
                                {...RegisterField("detail", {required: true, maxLength: 500})} 
                                onChange={handleChange}
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.detail?.type === 'required' || errors.detail?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}    
                                value={formData.detail}
                                placeholder="Write Objective/Task *"
                            >
                            </textarea>
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Detailed description of task, like the location of the items</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text'
                                {...RegisterField("item_location", {maxLength: 100})} 
                                onChange={handleChange} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.item_location?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}   
                                value={formData.item_location}
                                placeholder="Item's Location" 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Where item is located</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='text'
                                {...RegisterField("delivery_location", {maxLength: 100})} 
                                onChange={handleChange} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.delivery_location?.type === 'maxLength') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}   
                                value={formData.delivery_location}
                                placeholder="Delivery Location" 
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Where item should be delivered</p> */}
                        </div>
                        <div className='form-sect mb-5 md:mb-3 lg:mb-4'>
                            <input 
                                type='number'
                                {...RegisterField("price_offer", {required: true})} 
                                onChange={handleChange} 
                                className={`p-3 w-full border-solid border-2 border-gray-500 dark:border-white rounded-md shadow-sm focus:border-gray-200 
                                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-500 
                                    ${(errors.price_offer?.type === 'required') ? 'focus:border-red-200 focus:ring-red-400' : '' } 
                                    transition ease-in-out delay-150 dark:bg-transparent dark:text-white`}   
                                value={formData.price_offer}
                                placeholder='Price Offer *'
                            />
                            {/* <p className='text-sm text-slate-500 px-2'><span className='text-app-green'>NB</span>: Price for task fulfillment</p> */}
                        </div>
                        <button 
                            disabled={isLoading ? true : false}
                            type='submit' 
                            className={`mt-3 ${!isLoading ? 'bg-app-green' : 'bg-app-green-opacity animate-pulse'} text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150`}
                        >
                            {isLoading ? 'Submitting' : 'Create Task'}
                        </button>
                        {/* <p className='text-center mt-7 md:mt-3 lg:mt-6 text-gray-800'>Return to <Link to='/objectives' className='text-app-green hover:text-app-green'>Objectives</Link></p> */}
                    </form>
                </div>
            </div>
        </section>
        </motion.div>
    );
}
 
export default CreateTask;