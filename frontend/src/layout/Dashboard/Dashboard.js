import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import DashboardLoader from '../../loaders/DashboardLoader';
import { useAuth } from '../../context/AuthContext';


import './styles/dashboard.css'

const Profile = React.lazy(() => import ("./Profile"));
const TasksMonitor = React.lazy(() => import ("./TasksMonitor"));
const TaskHistory = React.lazy(() => import ("./TaskHistory"));
const Wallet = React.lazy(() => import ("./Wallet"));


const Dashboard = () => {
    // try and make request to server to get user, and user related tasks information
    const { user } = useAuth();

    return ( 
        <section className='py-28'>
            <div className='container mx-auto flex flex-col md:flex-row items-center relative'>
                <aside className='absolute h-14 md:h-auto w-full md:w-1/5 top-0 left-0 right-0 md:right-auto mx-auto'>
                    <ul className='w-full h-14 md:h-auto flex justify-center items-center flex-row md:flex-col'>
                        <li className='w-full h-14 md:h-auto text-center md:text-left'><NavLink style={{ padding: '1.25rem', display: 'block', color: 'black' }} className={({isActive}) => isActive ? 'font-semibold border-2 border-app-green-opacity border-b-0 md:border-r-0 md:border-b-2 h-14 md:h-auto' : 'border-b-2 md:border-b-0 md:border-r-2 border-app-green-opacity h-14 md:h-auto'} to={`/dashboard/user/${user.user_id}/profile`}>Profile</NavLink></li>
                        <li className='w-full h-14 md:h-auto text-center md:text-left'><NavLink style={{ padding: '1.25rem', display: 'block', color: 'black' }} className={({isActive}) => isActive ? 'font-semibold border-2 border-app-green-opacity border-b-0 md:border-r-0 md:border-b-2 h-14 md:h-auto' : 'border-b-2 md:border-b-0 md:border-r-2 border-app-green-opacity h-14 md:h-auto'} to={`/dashboard/user/${user.user_id}/wallet`}>Wallet</NavLink></li>
                        <li className='w-full h-14 md:h-auto text-center md:text-left'><NavLink style={{ padding: '1.25rem', display: 'block', color: 'black' }} className={({isActive}) => isActive ? 'font-semibold border-2 border-app-green-opacity border-b-0 md:border-r-0 md:border-b-2 h-14 md:h-auto' : 'border-b-2 md:border-b-0 md:border-r-2 border-app-green-opacity h-14 md:h-auto'} to={`/dashboard/user/${user.user_id}/monitor-tasks`}>Monitor</NavLink></li>
                        <li className='w-full h-14 md:h-auto text-center md:text-left'><NavLink style={{ padding: '1.25rem', display: 'block', color: 'black' }} className={({isActive}) => isActive ? 'font-semibold border-2 border-app-green-opacity border-b-0 md:border-r-0 md:border-b-2 h-14 md:h-auto' : 'border-b-2 md:border-b-0 md:border-r-2 border-app-green-opacity h-14 md:h-auto'} to={`/dashboard/user/${user.user_id}/history`}>History</NavLink></li>
                    </ul>
                </aside>
                <main className='basis-full w-full md:basis-4/5 translate-y-20 md:translate-y-0 md:translate-x-1/4 h-auto py-6 md:py-4 px-2 sm:px-5 md:bg-transparent'>
                    <Routes>
                        {/* <Route path="user/:id/profile" element={<Profile />} /> */}
                        {/* <Route path="loader" element={<DashboardLoader />} /> */}
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