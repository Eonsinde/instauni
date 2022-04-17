import React, { useEffect, useState, useRef } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';


const MyAccordion = ({ currentlyActive, MyKey, header, children, makeActive }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(currentlyActive === MyKey);
        // console.log("use effect running due to state and deps changes");
       
    }, [currentlyActive]);

    const handleOpening = () => {
        if (currentlyActive === MyKey){
            // set open to false and makeActive none(-1) else the accordion won't open again
            setOpen(false)
            makeActive(-1);
        }else{
            // set the currentlyActive to the accordion clicked on
            makeActive(MyKey);
        }
    }

    return (
        <>
        <div
            onClick={handleOpening}
            className={`flex justify-between items-center cursor-pointer py-4 px-3 border-b-2 border-border-dark text-lg ${open ? 'font-bold' : '' }`}
            aria-controls="example-collapse-text"
            aria-expanded={open}
        >
            <p>{header}</p>
            <span className=''>{ !open ? <AiOutlineDown /> : <AiOutlineUp />}</span>
        </div>
        <Collapse in={open}>
            <div id="example-collapse-text" className='p-3 text-lg'>
               {children}
            </div>
        </Collapse>
        </>
    );
}
 
export default MyAccordion;