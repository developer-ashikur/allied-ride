import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { fakeData } from '../../fakeData';
import Header from '../Header/Header';
import Ride from '../Ride/Ride';
import './Home.css';

const Home = () => {
    const allRides = fakeData;
    return (
        <div className='home'>
            <Header />
            <Container>
                <Row className='py-5 my-5'>
                    {
                        allRides.map(ride => <Ride key={ride.id} ride={ride} ></Ride>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Home;