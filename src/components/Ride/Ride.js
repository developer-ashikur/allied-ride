import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Ride.css';

const Ride = ({ ride }) => {
    const {id, rideName, image} = ride;
    return (
        <div className='col-md-3' >
            <Card className='p-4 rounded mb-4'>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title className='text-center'>{rideName}</Card.Title>
                </Card.Body>
                <Link to={`/destination/${id}`} className='btn btn-danger'>Ride</Link>
            </Card>
        </div>
    );
};

export default Ride;