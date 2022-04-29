import { createContext, useContext, useEffect } from 'react'
// import jwt_decode from 'jwt_decode'
import { useNavigate, Navigate, useLocation,  } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        // pay attention to user changing in the redux state
    }, [user]);

    const contextData = {
        user
    };

    return ( 
        <AuthContext.Provider value={contextData}>
            { children }            
        </AuthContext.Provider>
    );
}

const ProtectedView = ({ Component }) => {
    const location = useLocation();
    const { user } = useAuth();

    if (!user)
        return <Navigate to='/login' state={{from: location}} replace />;
    return ( 
        <Component />
    );
}
 
export { AuthProvider, ProtectedView };