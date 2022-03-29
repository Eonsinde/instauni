import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GenericView from './layout/GenericView';

import Header from './layout/Header';
import Objectives from './layout/Objectives';
import Test from './layout/Test';
import PageNotFound from './layout/PageNotFound';

import CreateTask from './forms/CreateTask';
import Register from './forms/Register';
import Login from './forms/Login';


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Components rendered with Dashboard Comp */}
          {/* <Route path='dashboard/*' element={<Dash />} /> */}
          <Route path='/*' element={ <GenericView /> } />

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


         
          

        </Routes>
     </Router>
  </>
  );
}

export default App;
