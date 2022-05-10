import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation,  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateToken, reset } from '../reducers/auth/authSlice'
import { toast } from 'react-toastify';


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const dispatch  = useDispatch();
    const { user, auth_tokens, tokenRefreshing, tokenRefreshError, message } = useSelector(state => state.auth);
    // define this here so that the theme in localStorage is used once page loads
    const [appTheme, setAppTheme] = useState(localStorage.theme ? localStorage.theme : '');
    
    useEffect(() => {
        if (tokenRefreshError){
            toast.error(`${message}`);
            dispatch(reset());
        }

        let fourMinutes = 1000 * 60 * 2; // 2 mins

        let interval = setInterval(() => {
            console.log("Auth Token: ", auth_tokens);
            if(auth_tokens){
                console.log("About to execute token refresh");
                dispatch(updateToken(null));
            }
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [tokenRefreshing, auth_tokens]);

    useEffect(() => {
        // to handle changing app theme
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
      }, [appTheme]);

    const contextData = {
        user,
        auth_tokens, 
        // send them to all comps so that the Header comp can access them
        appTheme,
        setAppTheme
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