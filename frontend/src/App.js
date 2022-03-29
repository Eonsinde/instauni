import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RouteControl from './routes/RouteControl';

import Header from './layout/Header';
import Objectives from './layout/Objectives';
import Test from './layout/Test';
import PageNotFound from './layout/PageNotFound';

import CreateTask from './forms/CreateTask';
import Register from './forms/Register';
import Login from './forms/Login';

import Dashboard from './layout/Dashboard/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Test />
            </>
          } />

          <Route path='home' element={
            <>
              <Header />
              <Test />
              <h3>egtrhggrgrtgrgergeg</h3>
            </>
          } />

          <Route path='objectives' element={
            <>
              <Header />
              <Objectives />
            </>
          } />

          <Route path='create-task' element={
            <>
              <Header />
              <CreateTask />
            </>
          } />

          {/* Components rendered with Dashboard Comp */}
          {/* <Route path='dashboard/*' element={<Dash />} /> */}
          <Route path='dashboard/*' element={<><Header /><Dashboard /></>} />

          {/* <Route path='/wallet' element={
            <>
              <Header />
              <Dashboard Component={Wallet} />
            </>
          } />

          <Route path='/monitor-tasks' element={
            <>
              <Header />
              <Dashboard Component={TasksMonitor} />
            </>
          } />

          <Route path='/history' element={
            <>
              <Header />
              <Dashboard Component={TaskHistory} />
            </>
          } /> */}


          {/* Auth aspects */}
          <Route path='/login' element={
            <>
              <Header />
              <Login />
            </>
          } />

          <Route path='/register' element={
            <>
              <Header />
              <Register />
            </>
          } />
          {/* <RouteControl path='/home' component={Test} /> */}
          {/* for the admin site */}
          {/* <Route exact path='/admin-login' component={Login} />
          <PrivateRoute exact path='/admin-dashboard' component={Dashboard} />
          <PrivateRoute path='/admin-profile' component={Profile} />
          <PrivateRoute path='/manage-books' component={ManageBook} />
          <PrivateRoute path='/manage-genres' component={ManageGenre} />
          <PrivateRoute path='/manage-excos' component={ManageExcos} />
          <PrivateRoute path='/manage-events' component={ManageEvent} />
          <PrivateRoute path='/manage-admin-users' component={ManageUsers} />
          <PrivateRoute path='/manage-new-members' component={ManageMembers} />
          <PrivateRoute path='/manage-contacts' component={ManageContacts} />
          <PrivateRoute path='/manage-prayer-requests' component={ManagePrayers} /> */}
          {/* <RouteControl component={PageNotFound} /> */}
          <Route path='*' element={
            <>
              <Header />
              <PageNotFound />
            </>
          } />

        </Routes>
     </Router>
  </>
  );
}

export default App;
