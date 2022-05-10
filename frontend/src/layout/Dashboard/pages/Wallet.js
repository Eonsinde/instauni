import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Wallet = () => {
    useEffect(() => {  
        document.title = `InstaLife | Username's | Wallet`;
    }, []);


    return ( 
        <div className='wallect-section flex flex-col space-y-10'>
           <div className='wallet-header'>
                <header className='flex justify-between align-center mb-4'>
                    <p className='dark:text-white'>Balance</p>
                    <Link to='#' className='text-app-green hover:text-app-green'>Fund Account</Link>
                </header>
                <h2 className='text-3xl dark:text-white'>P. 3550 (#3550)</h2>
           </div>
           <div className='wallet-body'>
                <header className='flex justify-between align-center mb-4'>
                    <p>Recents</p>
                    <Link to='#' className='text-app-green hover:text-app-green'>View More</Link>
                </header>
                <table className="table-auto mt-5 mb-7 w-full">
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
                <Link to='#' className='text-app-green hover:text-app-green inline'>Get Free Money</Link>
           </div>
        </div>
    );
}
 
export default Wallet;
