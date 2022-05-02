import { useEffect } from 'react';
import { motion } from 'framer-motion'
import { GiBinoculars } from 'react-icons/gi'
import { IoAddSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import './styles/objectives.css'


const Objectives = () => {
    useEffect(() => {  
        document.title = `InstaLife | Objectives`;
    }, []);

    return ( 
        <motion.div
            initial={{ translateY: '-100%', opacity: 0 }} 
            animate={{ translateY: 0, opacity: 1}} 
            exit={{ translateY: '-100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
        <section className='obj-section'>
            <div className='container mx-auto'>
                <div className='obj-wrapper py-10 flex justify-center items-center'>{/* had to include this div to style scroll bar and allow for y-overflow */}
                    <div className='flex flex-wrap flex-col md:flex-row md:items-start md:h-full md:w-11/12 mx-auto'>
                        <div className='text-center basis-full mb-10 md:mb-8'>
                            <h4 className='font-semibold text-xl'>I want to</h4>
                        </div>
                        <div className='obj basis-1/2 flex flex-col items-center justify-center text-center mb-10 md:mb-0'>
                            <Link to='/create-task' className='border-2 border-gray-700 rounded-full p-4 hover:bg-app-green hover:text-white hover:border-app-green hover:ring-8 hover:ring-green-200 transition'>
                                {/* <img className="mx-auto h-48 w-48 md:h-42 md:w-42 lg:h-72 lg:w-72" src={findImg} alt="" /> */}
                                <IoAddSharp className='text-9xl' />
                            </Link>
                            {/* <BsPlusCircle /> */}
                            <div className='obj-content flex flex-col items-center justify-center mt-8'>
                                <h4 className='obj-caption text-app-green text-xl mb-3 font-semibold'>Create</h4>
                                <p className='obj-text'>
                                    Post a microjob for individuals <br/>around the school to find and deliver
                                </p>
                            </div>
                        </div>
                        <div className='obj basis-1/2 flex flex-col items-center justify-center text-center mb-0 md:mb-0'>
                            <Link to='/find-task' className='border-2 border-gray-700 rounded-full p-4 hover:bg-app-green hover:text-white hover:border-app-green hover:ring-8 hover:ring-green-200 transition'>
                                {/* <img className="mx-auto h-48 w-48 md:h-42 md:w-42 lg:h-72 lg:w-72" src={findImg} alt="" /> */}
                                <GiBinoculars className='text-9xl' />
                            </Link>
                            {/* <MdOutlineManageSearch className='text-9xl' /> */}
                            <div className='obj-content flex flex-col items-center justify-center mt-8'>
                                <h4 className='obj-caption text-app-green text-xl mb-3 font-semibold'>Find</h4>
                                <p className='obj-text'>
                                    Search for microjobs posted<br/> by individuals around the school
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </motion.div>
    );
}
 
export default Objectives;