import React from 'react';

const DestinationDetails = ({rideName, image}) => {
    return (
        <div>
            <div className='d-flex justify-content-around bg-light p-4 my-4 rounded align-items-center'>
                <img src={image} alt="" className='w-25' />
                <h2>{rideName}</h2>
                <img src="https://i.ibb.co/M1PMd22/peopleicon.png" alt="" style={{ width: '30px' }} />
                <h2>5</h2>
                <h2>$70</h2>
            </div>
        </div>
    );
};

export default DestinationDetails;