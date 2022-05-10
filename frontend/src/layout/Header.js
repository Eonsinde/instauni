import { useState, useEffect, createRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../reducers/auth/authSlice';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

import { GiHamburgerMenu } from 'react-icons/gi';
// import { FiX } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'

import { AiOutlineLogout } from 'react-icons/ai';
import { VscColorMode } from 'react-icons/vsc';

import { FiArrowLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { ImCog } from 'react-icons/im';

import { Switch } from 'antd';
import { CSSTransition } from 'react-transition-group';
import './styles/header.css';



// Note: add quick links for navigation to pages like Objectives

const Nav = props => {
  return (
    <nav className={`nav_bar ${props.isOpen ? 'open' : ''}`}>
      <ul className='nav_bar_nav flex relative items-center'>
        {props.children}
      </ul>
    </nav>
  );
}

const NavItem = props => {
  return (
    <li className={`nav_item list-none mx-5 text-lg`}>
      <Link 
        to={`${props.path}`} 
        className={`nav_link ${props.classNames ? `${props.classNames} dark:${props.classNames} hover:${props.classNames}` : 'hover:text-gray-800 dark:text-white dark:hover:text-slate-200'}`}>
          {props.children}
      </Link>
    </li>
  )
}

const NavDropItem = ({setDropdownOpen, dropdownOpen, dropdownMenu}) => {
  return (
    <li className='list-none'>
       <Link to='#' onClick={() => setDropdownOpen(!dropdownOpen)} className='flex flex-row justify-center items-center space-x-3 text-gray-800 hover:text-gray-800'>
          <span className='text-2xl'><IoIosArrowDown /></span>
          <BsPersonCircle className='text-4xl' />
      </Link>
      {
          dropdownOpen
          ?
          <DropdownMenu ref={dropdownMenu} classNames={'shadow-md'}></DropdownMenu>
          :
          <></>
      }
    </li>
  )
}

const DropdownMenu = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { user, appTheme, setAppTheme } = useAuth();

    // const [appTheme, setAppTheme] = useState(localStorage.theme ? localStorage.theme : '');
    const [hasProfilePics, setHasProfilePics] = useState(null);
    const [activeMenu, setActiveMenu] = useState('main'); // settings, animals
    const [menuHeight, setMenuHeight] = useState(null);
  
    const calcHeight = (el) => {
      console.log("I'm here calculating height");
      const height = el.offsetHeight;
      setMenuHeight(height);
    }

    // const handleChangeAppTheme = e => {
    //   if (!e.target.checked){
    //     setAppTheme('light');
    //     console.log("App theme:", appTheme);
    //     localStorage.theme = 'light';
    //   } else {
    //     setAppTheme('dark');
    //     console.log("App theme:", appTheme);
    //     localStorage.theme = 'dark';
    //   }
    // }

    const onChangeAppTheme = (checked) => {
      console.log(`switch to ${checked}`);
      if (checked){
        setAppTheme('dark');
        console.log("App theme:", appTheme);
        localStorage.theme = 'dark';
      } else {
        setAppTheme('light');
        console.log("App theme:", appTheme);
        localStorage.theme = 'light';
      }
    }

    // to create dropdown headers
    const DropdownHeader = (props) => {
      return ( 
        <div className='dropdown-header'>
          <Link to='#' className='hover:text-gray-800' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className='icon icon-button'>{props.leftIcon}</span>
          </Link>
          <p>
            {props.children}
          </p>
        </div>
      );
    }
  
    const DropdownItem = (props) => {
      return ( 
        <Link to={`${props.path}`} 
          className='dropdown-item hover:text-gray-800' 
          onClick={ !props.isLogoutBtn ? () => props.goToMenu && setActiveMenu(props.goToMenu) : () => dispatch(logout()) }
        >
          <span className='icon icon-button'>{props.leftIcon}</span>
          {props.children}
          <span className='icon icon-right'>{props.rightIcon}</span>
        </Link>
      );
    }
  
    // drop down items for changing app theme
    const DropdownThemeItem = (props) => {
      return ( 
        <div className='dropdown-theme-item'>
          <Link to='#' className='hover:text-gray-800'>
            <span className='icon icon-button'>{props.leftIcon}</span>
          </Link>
          {props.children}
          {/* activate dark mode theme */}
        </div>
      );
    }
  
    return (
      <div ref={ref} className={`dropdown ${props.classNames}`} style={{height: menuHeight}}>
        <CSSTransition 
          in={activeMenu === 'main'} 
          unmountOnExit timeout={500} 
          classNames='menu-primary'
          // onEnter={calcHeight}
        >
          <div className='menu'>
            <DropdownItem
                // display user img rather than blank element 
                path={`/dashboard/user/${user.user_id}/profile`}
                leftIcon={!hasProfilePics ? <BsPersonCircle /> : <></>} 
            >
                My Profile
            </DropdownItem>
            <DropdownItem
              path='#'
              leftIcon={<ImCog />}
              rightIcon={<FiChevronRight />}    
              goToMenu="settings"
            >
              Settings {' & '} privacy
            </DropdownItem>
            <DropdownItem
              path='#'
              leftIcon={<VscColorMode />}
              rightIcon={<FiChevronRight />}    
              goToMenu="theme"
            >
              Display Theme
            </DropdownItem>
            <DropdownItem 
              path='#' 
              leftIcon={<AiOutlineLogout />}
              isLogoutBtn={true}
            >
              Logout
            </DropdownItem>
          </div>
        </CSSTransition>
  
        <CSSTransition 
          in={activeMenu === 'settings'} 
          unmountOnExit timeout={500} 
          classNames='menu-secondary'
        >
          <div className='menu'>
            <DropdownHeader
              leftIcon={<FiArrowLeft />}
              goToMenu="main"
            >
              Settings {' & '} Privacy
            </DropdownHeader>
            <DropdownItem
              path='#'
              leftIcon={<ImCog />}
            //   rightIcon={<FiChevronRight />}      
            >
              Animals
            </DropdownItem>
          </div>
        </CSSTransition>
  
        <CSSTransition 
          in={activeMenu === 'theme'} 
          unmountOnExit timeout={500} 
          classNames='menu-secondary'
        >
          <div className='menu'>
            <DropdownHeader
              leftIcon={<FiArrowLeft />}
              goToMenu="main"
            >
              Display Theme
            </DropdownHeader>
            <DropdownThemeItem leftIcon={<VscColorMode />} handleChangeAppTheme={onChangeAppTheme}>
              <div className='app-theme-wrapper dark:text-white'>
                <h4 className='dark:text-white'>Dark Mode</h4>
                <p>
                  Activate or Deactivate Dark Mode/Dark Theme in UI
                </p>
                <form className='app-theme-form' onSubmit={e => e.preventDefault()}>
                  <div className='app-theme-form-sect'>
                    <label>On/Off</label>
                    <Switch defaultChecked={(localStorage.theme === 'dark') ? true : false} onChange={onChangeAppTheme} />
                  </div>
                </form>
              </div>
            </DropdownThemeItem>
          </div>
        </CSSTransition>
      </div>
    )
});
   

const Header = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { message, isError, logoutSuccess } = useSelector(state => state.auth);

  let [navOpen, setNavOpen] = useState(false);
  let [dropdownOpen, setDropdownOpen] = useState(false);
  let dropdownMenu = createRef();

  useEffect(() => { 
    // for logout 
    if (isError){
      toast.error(message);
      dispatch(reset());
    }

    if (logoutSuccess){
      toast.success(message); 
      dispatch(reset());
    }
  }, [user, message, logoutSuccess, isError, dispatch]);

  useEffect(() => { // for the dropdown
    const handler = e => {
      // console.log("Click event", dropdownMenu, dropdownOpen);
      if (dropdownOpen && dropdownMenu.current !== null && !dropdownMenu.current.contains(e.target)){
        // console.log("Drop open about to close")
        // dropdownMenu.current.style.display = 'none';
        // setDropdownOpen(false);
        // if menuref not null and clicked on element isn't a child
        // console.log(dropdownMenu.current, dropdownMenu.current.contains(e.target));
        dropdownMenu.current.style.display = 'none';
        setDropdownOpen(false);
        // console.log("Drop closed")
      }
    }
    
    document.body.addEventListener('mousedown', handler);

    // cleanup
    // return () => {
    //   document.body.removeEventListener('mousedown', handler);
    // }
  }, [dropdownOpen]);

  return (  
      <header className="h-12vh px-5 dark:bg-app-dark">
          <div className='container h-full mx-auto flex justify-between items-center relative'>
              <div className='nav_bar_header flex justify-between items-center relative'>
                <Link to='/' className='text-gray-800 lg:text-5xl text-4xl font-semibold hover:text-gray-800 dark:text-white'>Insta<span className="text-app-green">life</span></Link>
                <Link to='#' onClick={() => setNavOpen(true)} className='nav_bar_toggler hidden text-gray-800 text-3xl font-semibold hover:text-gray-800'><GiHamburgerMenu /></Link>
              </div>
              <Nav isOpen={navOpen}>
                {/* <Link to='#' onClick={() => setNavOpen(false)} className='nav_bar_close_btn flex justify-center items-center text-2xl text-white hover:text-white h-10 w-10 bg-app-green border-2 border-green-500 shadow-md'><FiX /></Link> */}
                <NavItem path='/'>Home</NavItem>
                <NavItem path='/objectives'>Objectives</NavItem>
                <NavItem path='/contact'>Reach Us</NavItem>
                {
                  (user === null)
                  ?
                  <NavItem path='/register' classNames='text-app-green'>Get Started</NavItem>
                  :
                  <li className='nav_item list-none relative ml-5'>
                      <Link to='#' onClick={() => setDropdownOpen(!dropdownOpen)} className='nav_link flex flex-row justify-center items-center space-x-3 text-gray-800 hover:text-gray-800 dark:text-white'>
                          <span className='text-2xl'><IoIosArrowDown /></span>
                          <BsPersonCircle className='text-4xl' />
                      </Link>
                      {
                          dropdownOpen
                          ?
                          <DropdownMenu ref={dropdownMenu} classNames={'shadow-md'}></DropdownMenu>
                          :
                          <></>
                      }
                  </li>
                } 
              </Nav>
          </div>
      </header>
  );
}
 
export default Header;