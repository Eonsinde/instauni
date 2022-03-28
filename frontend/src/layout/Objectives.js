import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { MdOutlineManageSearch } from 'react-icons/md'

const Objectives = () => {
    return ( 
        <section className='objectives'>
            <div className='container mx-auto'>
                <div className='flex flex-wrap justify-center h-96'>
                    <div className='text-center basis-full bg-slate-300'>
                        <h4 className='font-semibold text-xl bg-slate-500'>I want to</h4>
                    </div>
                    <div className='basis-1/2 objective flex flex-col items-center justify-center text-center'>
                        <AiOutlinePlusCircle className='text-9xl' />
                        {/* <BsPlusCircle /> */}
                        <div className='objective-content flex flex-col items-center justify-center'>
                            <h4 className='objective-caption text-green-500 text-lg'>Create</h4>
                            <p className='objective-text'>
                                Post a microjob for individuals around the school to find and deliver
                            </p>
                        </div>
                    </div>
                    <div className='basis-1/2 objective flex flex-col items-center justify-center text-center'>
                        <MdOutlineManageSearch className='text-9xl' />
                        <div className='objective-content flex flex-col items-center justify-center'>
                            <h4 className='objective-caption text-green-500 text-lg'>Find</h4>
                            <p className='objective-text'>
                                Search for microjobs posted by individuals around the school
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Objectives;