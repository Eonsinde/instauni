import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BaseView from './layout/BaseView';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={ <BaseView /> } />
        </Routes>
     </Router>
  </>
  );
}

export default App;
