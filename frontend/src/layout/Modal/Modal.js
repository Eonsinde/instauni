import {motion} from 'framer-motion';
import './modal.css';


const InstaModal = ({ setIsOpen, height, width, children, className:classNames }) => {
    const handleClick = e => {
        if (e.target.classList.contains('insta_backdrop')){
            setIsOpen(false);
        }
    }

    return (
        <motion.div className='insta_backdrop' 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClick}
            >
                <motion.div 
                    initial={{ y:'-100vh' }}
                    animate={{ y: 0 }}
                    style={{height: height ? height : 'auto', width: width ? width : 'auto' }}
                    className={`${classNames ? classNames : ''}`}
                >
                    {children}
                </motion.div>
        </motion.div>
    )
}
 
export default InstaModal;