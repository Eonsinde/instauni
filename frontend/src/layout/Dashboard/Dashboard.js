import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = ({Component}) => {
    return ( 
        <section className='py-28'>
            <div className='container mx-auto flex flew-row items-center'>
                <aside className='flex justify-center items-center basis-2/5 h-auto'>
                    <ul className='flex flex-col justify-center items-center'>
                        <li className='mb-10'><Link to='/profile' className=''>Profile</Link></li>
                        <li className='mb-10'><Link to='/wallet' className=''>Wallet</Link></li>
                        <li className='mb-10'><Link to='/monitor-tasks' className=''>Monitor</Link></li>
                        <li className=''><Link to='/history' className=''>History</Link></li>
                    </ul>
                </aside>
                <main className='basis-3/5 h-auto'>
                    <Component />
                </main>
            </div>
        </section>
    );
}
 
export default Dashboard;