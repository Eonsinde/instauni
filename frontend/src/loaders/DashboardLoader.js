import React from 'react';


const DashboardLoader = (props) => {
    return ( 
        <div style={{...styles.svgWrapper}}>
            <svg
                style={{...styles.svg}}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                xmlSpace="preserve"
                {...props}
            >
                <path
                    fill="#23B123"
                    d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
                >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="1s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div> 
    );
}

const styles = {
    svgWrapper: {
        height: '30vh',
        width: '70%', // adjust this to change center position of SVG
        margin: 'auto',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        // background: 'red'
    },
    svg: {
        width: '150px',
        height: '150px',
        display: 'block'
    }
}
 
export default DashboardLoader;