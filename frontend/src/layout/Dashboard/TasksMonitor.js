import React from 'react';
import { Link } from 'react-router-dom';


const TasksMonitor = () => {
    return ( 
        <>
            <div className=''>
                <header className='flex justify-between align-center mb-4'>
                    <Link to='#' className='text-green-500'>Filter</Link>
                    <div className='filter-options flex space-x-2'>
                        <button className='bg-gray-100 text-gray-800 p-2 rounded-md'>Status</button>
                        <button className='bg-gray-100 text-gray-800 p-2 rounded-md'>Action</button>
                        <button className='bg-gray-100 text-gray-800 p-2 rounded-md'>Duration</button>
                    </div>
                </header>
                <table class="table-auto mt-5 mb-7 w-full">
                    <thead>
                        <tr>
                            <th className='text-left'>Date</th>
                            <th className='text-center'>Time</th>
                            <th className='text-center'>Task</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Reg NO</th>
                            <th className='text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>7/4/21</td>
                            <td className='text-center'>12:30</td>
                            <td className='text-center'>Buy: Wanke Rice and Cway</td>
                            <td className='text-center'>P. 350 (#350)</td>
                            <td className='text-center'>1800436</td>
                            <td className='text-center'>Tick / <span className='text-md'>X</span></td>
                        </tr>
                        <tr>
                            <td>7/4/21</td>
                            <td className='text-center'>12:30</td>
                            <td className='text-center'>Buy: Wanke Rice and Cway</td>
                            <td className='text-center'>P. 350 (#350)</td>
                            <td className='text-center'>1800436</td>
                            <td className='text-center'>Tick / <span className='text-md'>X</span></td>
                        </tr>
                        <tr>
                            <td>7/4/21</td>
                            <td className='text-center'>12:30</td>
                            <td className='text-center'>Buy: Wanke Rice and Cway</td>
                            <td className='text-center'>P. 350 (#350)</td>
                            <td className='text-center'>1800436</td>
                            <td className='text-center'>Tick / <span className='text-md'>X</span></td>
                        </tr>
                    </tbody>
                </table>
                <Link to='#' className='text-green-500 inline'>Get Free Money</Link>
           </div>
        </>
    );
}
 
export default TasksMonitor;