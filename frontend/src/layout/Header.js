import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Link } from "react-router-dom"
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'

import { AiOutlineLogout } from 'react-icons/ai';
import { VscColorMode } from 'react-icons/vsc';

import { FiArrowLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { ImCog } from 'react-icons/im';

import { CSSTransition } from 'react-transition-group';
import './styles/header.css';



// Note: add quick links for navigation to pages like Objectives
const DropdownMenu = forwardRef((props, ref) => {
    const [hasProfilePics, setHasProfilePics] = useState(null);
    const [activeMenu, setActiveMenu] = useState('main'); // settings, animals
    const [menuHeight, setMenuHeight] = useState(null);
  
    const calcHeight = (el) => {
      console.log("I'm here calculating height");
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
    // to create dropdown headers
    const DropdownHeader = (props) => {
      return ( 
        <div className='dropdown-header'>
          <a href='#' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className='icon icon-button'>{props.leftIcon}</span>
          </a>
          <p>
            {props.children}
          </p>
        </div>
      );
    }
  
    const DropdownItem = (props) => {
      return ( 
        <Link to='/dashboard/user/2/profile' className='dropdown-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className='icon icon-button'>{props.leftIcon}</span>
          {props.children}
          <span className='icon icon-right'>{props.rightIcon}</span>
        </Link>
      );
    }
  
    // drop down items for the theme meny
    const DropdownThemeItem = (props) => {
      return ( 
        <div className='dropdown-theme-item'>
          <a href='#'>
            <span className='icon icon-button'>{props.leftIcon}</span>
          </a>
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
                leftIcon={!hasProfilePics ? <BsPersonCircle /> : <></>} 
            >
                My Profile
            </DropdownItem>
            <DropdownItem
              leftIcon={<ImCog />}
              rightIcon={<FiChevronRight />}    
              goToMenu="settings"
            >
              Settings {' & '} privacy
            </DropdownItem>
            <DropdownItem
              leftIcon={<VscColorMode />}
              rightIcon={<FiChevronRight />}    
              goToMenu="theme"
            >
              Display Theme
            </DropdownItem>
            <DropdownItem leftIcon={<AiOutlineLogout />}>Logout</DropdownItem>
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
            <DropdownThemeItem leftIcon={<VscColorMode />}>
              <div className='app-theme-wrapper'>
                <h4>Dark Mode</h4>
                <p>
                  Activate or Deactivate Dark Mode/Dark Theme in UI
                </p>
                <form className='app-theme-form' onSubmit={e => e.preventDefault()}>
                  <div className='app-theme-form-sect'>
                    <label>On/Off</label>
                    <input type='checkbox' />
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
    let [dropdownOpen, setDropdownOpen] = useState(false);
    let dropdownMenu = React.createRef();

    let [user, setUser] = useState({
        username: "Eonsinde",
        isAuth: true,
        email: 'olasinde.eon@gmail.com'
    });

    useEffect(() => {
      const handler = e => {
        // console.log("Click event", dropdownMenu, dropdownOpen);
        if (dropdownOpen && dropdownMenu.current !== null && !dropdownMenu.current.contains(e.target)){
          // console.log("Drop open about to close")
          // dropdownMenu.current.style.display = 'none';
          // setDropdownOpen(false);
          // if menuref not null and clicked on element isn't a child
          console.log(dropdownMenu.current, dropdownMenu.current.contains(e.target));
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
        <header style={{...styles.header}} className="">
            <div className='container h-full mx-auto flex justify-center items-center relative'>
                <Link to='/' className='text-gray-800 text-5xl font-semibold hover:text-gray-800'>Insta<span className="text-app-green">life</span></Link>
                {
                    !user.isAuth
                    ?
                    <></>
                    :
                    <div className='flex items-center absolute left-3/4'>
                        <Link to='#' onClick={() => setDropdownOpen(!dropdownOpen)} className='flex flex-row justify-center items-center space-x-3 text-gray-800'>
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
                    </div>
                } 
            </div>
        </header>
    );
}

const styles = {
    header: {
        height: '18vh'
    }
}
 
export default Header;