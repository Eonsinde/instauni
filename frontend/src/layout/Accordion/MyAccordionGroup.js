import React, { useState, useEffect } from 'react';
import MyAccordion from './MyAccordion';

const MyAccordionGroup = ({ items }) => {
    // represents which accordion is active
    let [active, setActive] = useState(-1);

    // useEffect(() => {

    // }, [active]);

    const handleSetActive = index => {
        setActive(index);
    }

    return (
        <>
            {
                items.map((item, index) => 
                    <MyAccordion key={index} MyKey={index} currentlyActive={active} makeActive={handleSetActive} header={item.header}>{item.body}</MyAccordion>    
                )
            }
        </>
    );
}
 
export default MyAccordionGroup;