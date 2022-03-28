import { Route } from 'react-router-dom';
import Header from '../layout/Header';



const RouteControl = ({ component:Component, ...rest }) => {
    return (  
        <Route {...rest} element={
            <>
              <Header />
              <Component />
            </>
          } 
        />
    );
}
 
export default RouteControl;