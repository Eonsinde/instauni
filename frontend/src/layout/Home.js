import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';

import { useAuth } from '../context/AuthContext';
// import MyAccordionGroup from './Accordion/MyAccordionGroup';

import homeImg from '../Assets/images/home/homepic.png';
import about1 from '../Assets/images/home/about_1.png';
import about2 from '../Assets/images/home/about_2.png';
import about3 from '../Assets/images/home/about_3.png';

import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FcSearch } from 'react-icons/fc';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import './styles/home.css';


const Home = () => {
    const { user } = useAuth();

    useEffect(() => {
        // make request for FAQs using dispatch
    }, []);

    return (
        <> 
        <section className='showcase-section container mx-auto h-82vh flex md:flex-row justify-center items-center flex-col-reverse px-5'>
            <div className='showcase-text text-gray-800 basis-1/2 space-y-6 mt-10 md:mt-0 md:text-left text-center'>
                <h1 className='font-bold lg:text-5xl text-4xl'>Make your life easier<br /> and softer</h1>
                <p className='text-lg '>
                    Whatever you want within the campus, brought right to you<br/>
                </p>
                <div className='flex md:justify-start md:items-center justify-center items-center space-x-2'>
                    <Link 
                        to={`${(user === null) ? '/register' : '/create-task'}`}
                        className='bg-white border-2 border-app-green py-2 px-2 text-app-green hover:text-app-green font-bold text-center inline-block lg:basis-2/6 md:basis-5/12 basis-3/6 rounded-md'
                    >
                        {(user === null) ? 'Create Account' : 'Create Task'}
                    </Link>
                    <Link 
                        to={`${(user === null) ? '/login' : '/find-task'}`}
                        className='bg-app-green py-2 px-2 border-2 border-app-green text-white hover:text-white font-bold text-center inline-block lg:basis-3/12 md:basis-1/4 basis-2/6 rounded-md'
                    >
                        {(user === null) ? 'Log In' : 'Find Task'}
                    </Link>
                </div>
            </div>
            <div className='basis-1/2'>
                <img src={homeImg} alt='Page Not Found Img' className='md:ml-auto' width={'85%'} height={'85%'} />
            </div>
        </section>

        <section className='about-section bg-gray-50 mt-6vh py-40 px-5'>
            <div className='container mx-auto'>
                <div className='about-header text-center mb-20'>
                    <h1 className='font-bold lg:text-5xl text-4xl mb-8'>How it works</h1>
                    <p className='text-lg'>Get started with 3 simple steps</p>
                </div>
                <div className='about-body flex md:flex-row flex-col items-center justify-center md:space-y-0 space-y-10'>
                    <div className='about-item basis-1/3 flex flex-col items-center justify-center space-y-10'>
                        <img className='h-52 w-52' src={about1} alt='how-to-img' />
                        <div className='text-center text-lg'>
                            <p className='font-bold mb-2'>Register / Login</p>
                            <p>
                                Create a new account or log<br/> into an already existing<br/> account
                            </p>
                        </div>
                    </div>
                    <div className='about-item basis-1/3 flex flex-col items-center justify-center space-y-10'>
                        <img className='h-52 w-52' src={about2} alt='how-to-img' />
                        <div className='text-center text-lg'>
                            <p className='font-bold mb-2'>Make a Choice</p>
                            <p>
                                Make a choice between<br/> creating a task or finding a<br/> task
                            </p>
                        </div>
                    </div>
                    <div className='about-item basis-1/3 flex flex-col items-center justify-center space-y-10'>
                        <img className='h-52 w-52' src={about3} alt='how-to-img' />
                        <div className='text-center text-lg'>
                            <p className='font-bold mb-2'>Follow Steps</p>
                            <p>
                                Follow steps based<br/>on the choice you've<br/>made
                            </p>
                        </div>
                    </div>
                </div>
                <Link to='/objectives' className='bg-app-green py-2 px-2 border-2 rounded-md border-app-green text-white hover:text-white font-bold text-center block w-52 mt-12 mx-auto text-lg'>Get Started</Link>
            </div>
        </section>

        <section className='faq-section py-40 px-5'>
            <div className='container mx-auto'>
                <div className='faq-header text-center mb-20'>
                    <h1 className='font-bold lg:text-5xl text-4xl mb-8'>FAQs</h1>
                    <p className='text-lg'>Have question? We are here to help</p>
                    <form className='mt-4'>
                        <div className='border-2 rounded-md border-border-dark py-2 xl:w-3/12 lg:w-2/6 md:w-5/12 sm:w-3/5 w-3/4 mx-auto flex justify-between items-center'>
                            <label className='text-3xl basis-1/5 flex justify-center items-center px-2'><FcSearch /></label>
                            <input type='text' className='text-lg basis-4/5 outline-none pr-3' placeholder='Search' />
                        </div>
                    </form>
                </div>
                <div className='faq-body'>
                    <Collapse 
                        className='text-lg border-0 bg-white' 
                        defaultActiveKey={['']} 
                        expandIcon={({ isActive }) => isActive ? <AiOutlineUp style={{ fontSize: '1.1rem' }} /> : <AiOutlineDown style={{ fontSize: '1.1rem' }} /> }
                        expandIconPosition={'right'}
                        accordion
                    >
                        <Collapse.Panel header="This is panel header 1" key="1">
                            <p>lorem jrbfjkfnrkf fjknjrnfjre frjf ref er f rjkfn rf refjnrejf rj fjf jk fjkw fjk f jwe fjw f wfjk ejf we fkjejf jwe fwejf jke kewjf ek wf</p>
                        </Collapse.Panel>
                        <Collapse.Panel header="This is panel header 2" key="2">
                            <p>lorem jrbfjkfnrkf fjknjrnfjre frjf ref er f rjkfn rf refjnrejf rj fjf jk fjkw fjk f jwe fjw f wfjk ejf we fkjejf jwe fwejf jke kewjf ek wf</p>
                        </Collapse.Panel>
                        <Collapse.Panel header="This is panel header 3" key="3">
                            <p>lorem jrbfjkfnrkf fjknjrnfjre frjf ref er f rjkfn rf refjnrejf rj fjf jk fjkw fjk f jwe fjw f wfjk ejf we fkjejf jwe fwejf jke kewjf ek wf</p>
                        </Collapse.Panel>
                    </Collapse>
                </div>
                <div className='text-lg mt-20 text-center px-5'>
                    <span className='font-bold'>Still have questions?{' '}</span><Link to='/objectives' className='text-app-green hover:text-app-green'>Get Started</Link>
                    {' '}and we will get back within 24 hours
                </div>
            </div>
        </section>

        <footer className='text-center bg-gray-50 py-10'>
            <div className='flex items-center justify-center space-x-16 py-12'>
                <Link to='#' className='h-16 w-16 rounded-full flex justify-center items-center bg-white text-4xl text-blue-400 hover:text-blue-400'><BsTwitter /></Link>
                <Link to='#' className='h-16 w-16 rounded-full flex justify-center items-center bg-white text-4xl text-blue-400'><BsInstagram /></Link>
            </div>
            <p className='text-lg'>&copy; 2022 Instalife</p>
        </footer>
        </>
    );
}
 
export default Home;