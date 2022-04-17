import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BaseView from './layout/BaseView';

import Login from './forms/Login';
import Register from './forms/Register';
import PageNotFound from './layout/PageNotFound';


function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/*' element={ <BaseView /> } />

            {/* Auth Pages aspects */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          
            {/* No-matching route */}
            <Route path='/pnf' element={<PageNotFound />} />
        </Routes>
     </Router>
  </>
  );
}

export default App;
