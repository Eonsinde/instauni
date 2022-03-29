import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import TaskHistory from './TaskHistory';
import TasksMonitor from './TasksMonitor';
import Wallet from './Wallet';


const Dashboard = () => {
    return ( 
        <section className='py-28'>
            <div className='container mx-auto flex flew-row items-center'>
                <aside className='flex justify-center items-center basis-2/5 h-auto'>
                    <ul className='flex flex-col justify-center items-center'>
                        <li className='mb-10'><Link to='/dashboard/user/profile' className=''>Profile</Link></li>
                        <li className='mb-10'><Link to='/dashboard/user/wallet' className=''>Wallet</Link></li>
                        <li className='mb-10'><Link to='/dashboard/user/monitor-tasks' className=''>Monitor</Link></li>
                        <li className=''><Link to='/dashboard/user/history' className=''>History</Link></li>
                    </ul>
                </aside>
                <main className='basis-3/5 h-auto'>
                    <Routes>
                        {/* <Route path="user/:id/profile" element={<Profile />} /> */}
                        <Route path="user/profile" element={<Profile />} />
                        <Route path="user/wallet" element={<Wallet />} />
                        <Route path="user/monitor-tasks" element={<TasksMonitor />} />
                        <Route path="user/history" element={<TaskHistory />} />
                    </Routes>
                </main>
            </div>
        </section>
    );
}
 
export default Dashboard;