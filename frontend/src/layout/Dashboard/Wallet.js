import React from 'react';
import { Link } from 'react-router-dom';


const Wallet = () => {
    return ( 
        <div className='flex flex-col space-y-10'>
           <div className=''>
                <header className='flex justify-between align-center mb-4'>
                    <p>Balance</p>
                    <Link to='#' className='text-green-500'>Fund Account</Link>
                </header>
                <h2 className='text-3xl'>P. 3550 (#3550)</h2>
           </div>
           <div className=''>
                <header className='flex justify-between align-center mb-4'>
                    <p>Recents</p>
                    <Link to='#' className='text-green-500'>View More</Link>
                </header>
                <table class="table-auto mt-5 mb-7 w-full">
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
        </div>
    );
}
 
export default Wallet;
