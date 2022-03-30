import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import DashboardLoader from '../../loaders/DashboardLoader';

const Profile = React.lazy(() => import ("./Profile"));
const TasksMonitor = React.lazy(() => import ("./TasksMonitor"));
const TaskHistory = React.lazy(() => import ("./TaskHistory"));
const Wallet = React.lazy(() => import ("./Wallet"));


const Dashboard = () => {
    return ( 
        <section className='py-28'>
            <div className='container mx-auto flex flew-row items-center'>
                <aside className='flex justify-center items-center basis-1/5 md:basis-2/5 h-auto'>
                    <ul className='flex flex-col justify-center items-center'>
                        <li className='mb-10'><NavLink className={({isActive}) => isActive ? 'font-semibold' : undefined} to='/dashboard/user/2/profile'>Profile</NavLink></li>
                        <li className='mb-10'><NavLink className={({isActive}) => isActive ? 'font-semibold' : undefined} to='/dashboard/user/2/wallet'>Wallet</NavLink></li>
                        <li className='mb-10'><NavLink className={({isActive}) => isActive ? 'font-semibold' : undefined} to='/dashboard/user/2/monitor-tasks'>Monitor</NavLink></li>
                        <li className=''><NavLink className={({isActive}) => isActive ? 'font-semibold' : undefined} to='/dashboard/user/2/history'>History</NavLink></li>
                    </ul>
                </aside>
                <main className='basis-4/5 md:basis-3/5 h-auto'>
                    <Routes>
                        {/* <Route path="user/:id/profile" element={<Profile />} /> */}
                        <Route path="loader" element={<DashboardLoader />} />
                        <Route path="user/:id/profile" element={
                            <React.Suspense fallback={<DashboardLoader />}>
                                <Profile />
                            </React.Suspense>
                        } />
                        <Route path="user/:id/wallet" element={
                            <React.Suspense fallback={<DashboardLoader />}>
                                <Wallet />
                            </React.Suspense>
                        } />        
                        <Route path="user/:id/monitor-tasks" element={
                            <React.Suspense fallback={<DashboardLoader />}>
                                <TasksMonitor />
                            </React.Suspense>
                        } />    
                         <Route path="user/:id/history" element={
                            <React.Suspense fallback={<DashboardLoader />}>
                                <TaskHistory />
                            </React.Suspense>
                        } />    
                    </Routes>
                </main>
            </div>
        </section>
    );
}
 
export default Dashboard;