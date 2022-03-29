import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Objectives from './Objectives';
import CreateTask from '../forms/CreateTask';
import Test from './Test';

import Dashboard from './Dashboard/Dashboard';

import Login from '../forms/Login';
import Register from '../forms/Register';
import PageNotFound from './PageNotFound';


const GenericView = () => {
    return ( 
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Test />} />
                <Route path="home" element={
                    <>
                        <Test />
                        <h3>egtrhggrgrtgrgergeg</h3>
                    </>
                } />
                <Route path="objectives" element={<Objectives />} />
                <Route path="create-task" element={<CreateTask />} />

                {/* Auth aspects */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='dashboard/*' element={<Dashboard />} />
                
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    );
}
 
export default GenericView;