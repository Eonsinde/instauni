import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';

import BaseView from './layout/BaseView';

import Login from './forms/Login';
import Register from './forms/Register';
import PageNotFound from './layout/PageNotFound';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <Routes>
              <Route path='/*' element={ <BaseView /> } />

              {/* Auth Pages aspects */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            
              {/* No-matching route */}
              <Route path='/pnf' element={<PageNotFound />} />
              <Route path='*' element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
     </Router>
     <ToastContainer />
  </Provider>
  );
}

export default App;
