import React,  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { FiAlignLeft } from 'react-icons/fi';
import { FcSearch } from 'react-icons/fc';
import { BsClock, BsHouse } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';

import './styles/find_task.css';


const FindTask = () => {
    let [query, setQuery] = useState('');
    let [tasks, setTasks] = useState([
        {
            status: 'pending',
            name: "Ade Sinachi Yusuf",
            price_offer: '#500',
            objective: 'Collect notes from Zion',
            item_location: 'F110, Isaac Hall',
            delivery_location: 'F301, Abraham Hall',
            existential_duration: '3Min(s)'
        },
        {
            status: 'accepted',
            name: "Olasinde Enoch",
            price_offer: '#800',
            objective: 'Get beloved from cafe',
            item_location: 'F110, Isaac Hall',
            delivery_location: 'F301, Abraham Hall',
            existential_duration: '54Min(s)'
        },
        {
            status: 'completed',
            name: "Aloha Oghosa",
            price_offer: '#6000',
            objective: 'Buy calculator from bookshop',
            item_location: 'F110, Isaac Hall',
            delivery_location: 'F301, Abraham Hall',
            existential_duration: '23Min(s) 30Sec(s)'
        },
        {
            status: 'pending',
            name: "Thomas partey",
            price_offer: '#1000',
            objective: 'Get package from Tobi and delivery to me',
            item_location: 'F300, Isaac Hall',
            delivery_location: 'F101, Daniel Hall',
            existential_duration: '12Hr(s) 24Min(s) 5Sec(s)'
        },
    ]);

    return ( 
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
        <section className='h-82vh'>
            <div className='container mx-auto'>
                <header className='flex justify-between items-center  border-border-dark py-2'>
                    <div className='text-app-green font-medium flex justify-center items-center text-2xl space-x-2'><FiAlignLeft /><span className='text-xl'>Filter</span></div>
                    <form className='' onSubmit={e => e.preventDefault()}>
                        <div className='border-2 rounded border-border-dark py-1 mx-auto flex justify-between items-center'>
                            <label className='text-2xl basis-1/5 flex justify-center items-center px-2'><FcSearch /></label>
                            <input type='text' onChange={e => setQuery(e.target.value)} className='basis-4/5 outline-none pr-3' placeholder='Search names, halls, task type' />
                        </div>
                    </form>
                </header>

                <main className='tasks-wrapper basis-3/4 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-2'>
                    {
                        tasks.map((task, id) => 
                            <figure key={id} className="space-y-4 border-2 border-gray-100 shadow-md p-10 rounded-lg">
                                <header className='flex justify-between'>
                                    <p className='text-gray-800 font-semibold text-2xl'>{task.name}</p>
                                    <p className='text-gray-800 font-semibold text-2xl'>{task.price_offer}</p>
                                </header>
                                <div className='space-y-4 font-medium'>
                                    <p>
                                        Task(
                                        <span
                                            className={
                                                `font-semibold ${(task.status === 'pending' && 'text-red-600') || (task.status === 'completed' && 'text-app-green') || (task.status === 'accepted' && 'text-sky-500')}`
                                            }
                                        >
                                            {task.status.toUpperCase()}
                                        </span>
                                        ):{' '}
                                        {task.objective}
                                    </p>
                                    <div className='space-y-2'>
                                        <div className="text-gray-800 dark:text-sky-400 font-medium flex justify-start items-center space-x-2">
                                            <GoLocation className='text-xl' /> <span>Item's Location</span>
                                        </div>
                                        <p>{task.item_location}</p>
                                    </div>
                                    <div className='space-y-2'>
                                        <div className="text-gray-800 dark:text-sky-400 font-medium flex justify-start items-center space-x-2">
                                            <BsHouse className='text-xl' /> <span>Delivery Location</span>
                                        </div>
                                        <p>{task.delivery_location}</p>
                                    </div>
                                </div>
                                <figcaption className="font-medium flex justify-between">
                                    <div className="text-gray-800 dark:text-sky-400 flex flex-col justify-center items-start space-y-2">
                                        <div className="text-gray-800 dark:text-sky-400 font-medium flex justify-start items-center space-x-2">
                                            <BsClock className='text-xl' /> <span>Created</span>
                                        </div>
                                        <p>{task.existential_duration}</p>
                                    </div>
                                    <button 
                                        disabled={
                                            (task.status === 'completed' && true) || (task.status === 'accepted' && true)
                                        }
                                        className={
                                            `text-white dark:text-slate-500 p-0 px-3 lg:p-2 lg:px-4 rounded-md font-semibold bg-app-green shadow-sm focus:ring-4 focus:ring-green-200 transition ease-in-out delay-150
                                            ${(task.status === 'completed' && 'bg-app-green-opacity') || (task.status === 'accepted' && 'bg-app-green-opacity')}`
                                        }
                                    >
                                        Accept Task
                                    </button>
                                </figcaption>
                            </figure>                    
                        )
                    }
                </main>
            </div>
        </section>
        </motion.div>
    );
}
 
export default FindTask;