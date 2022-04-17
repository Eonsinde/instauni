import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './Header';

// import Dashboard from './Dashboard/Dashboard';

// import FindTask from './FindTask';
import Home from './Home';
import PageLoader from '../loaders/PageLoader';

const Objectives = React.lazy(() => import ("./Objectives"));
const Test = React.lazy(() => import("./Test"));
const CreateTask = React.lazy(() => import("../forms/CreateTask"));
const FindTask = React.lazy(() => import("./FindTask"));
const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));


const BaseView = () => {
    return ( 
        <>
            <Header />
            <AnimatePresence exitBeforeEnter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="home" element={
                        <React.Suspense fallback={<PageLoader />}>
                            <Test />
                        </React.Suspense>
                    } />
                    <Route path="objectives" 
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <Objectives />
                            </React.Suspense>
                        } 
                    />
                    <Route path="page-loader" element={<PageLoader />} />
                    <Route path="create-task" 
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <CreateTask />
                            </React.Suspense>
                        } 
                    />
                    <Route path="find-task" 
                        element={
                            <React.Suspense fallback={<PageLoader />}>
                                <FindTask />
                            </React.Suspense>
                        } 
                    />

                    {/* Dashboard/Components to be rendered in dashboard */}
                    <Route path="dashboard/*" 
                        element={
                            <React.Suspense fallback={<></>}>
                                <Dashboard />
                            </React.Suspense>
                        } 
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
}
 
export default BaseView;