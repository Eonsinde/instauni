
export const ProfileDetailsLoader = () => {
    return (
        <div className='user-details flex flex-col justify-start items-center md:items-start'>
            <div className='bg-gray-200 h-6 w-72 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-60 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-52 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-40 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-32 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-36 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-32 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-36 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-60 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-64 animate-pulse rounded mb-6'></div>
            <div className='bg-gray-200 h-6 w-72 animate-pulse rounded mb-6'></div>
        </div>
    )
}

export const ProfileImageLoader = () => {
    return (
        <figure className='flex flex-col justify-center items-center space-y-3 mb-8 md:mb-0'>
            {
            
                <div style={{height:'250px', width: '250px'}} className='bg-gray-200 rounded-full animate-pulse'></div>
                
            }
            <div className='bg-gray-200 h-6 w-24 animate-pulse rounded mb-6'></div>
        </figure>
    )
}

export const DashSpinnerLoader = (props) => {
    return ( 
        <div className="w-full h-72 md:h-52 flex justify-center items-center">
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
    svg: {
        width: '150px',
        height: '150px',
        display: 'block'
    }
}
 