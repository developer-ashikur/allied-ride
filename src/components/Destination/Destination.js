import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { fakeData } from '../../fakeData';
import Header from '../Header/Header';
import './Destination.css';

const Destination = () => {
    const [destination, setDestination] = useState({
        pickFrom: '',
        pickTo: '',
        date: ''
    });
    const [search, setSearch] = useState(false);
    const {id} = useParams();
    const {image, rideName} = fakeData.find(ride => ride.id === parseInt(id));
    const handleBlur =(e) => {
        const newDestination = {...destination};
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination);
    }
    const handleDate = (e) => {
        const newDestination = {...destination};
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination);
    }
    return (
        <div>
            <Header />
            <Container>
                <hr />
                <Row>
                    <div className="col-md-6 g-4">
                        <div className="destination-form p-4 rounded">
                        {
                          !search &&  
                          <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Pic From</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" name='pickFrom' onBlur={handleBlur} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Pick To</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" name='pickTo' onBlur={handleBlur} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">Date</label>
                                <input type="date" className="form-control" id="exampleInputPassword2" name='date' onChange={handleDate} />
                            </div>
                            <button className="btn btn-danger btn-block" onClick={() => setSearch(!search)} >Search</button>
                            </form>
                        }
                        {
                            search && 
                            <div>
                                <div className='bg-danger p-4 text-white rounded'>
                                    <h2>{destination.pickFrom}</h2>
                                    <p>To,</p>
                                    <h2>{destination.pickTo}</h2>
                                    <h4>Date: {destination.date} </h4>
                                </div>
                                <div className='d-flex justify-content-around bg-light p-4 my-4 rounded align-items-center'>
                                    <img src={image} alt="" className='w-25' />
                                    <h2>{rideName}</h2>
                                    <img src="https://i.ibb.co/M1PMd22/peopleicon.png" alt="" style={{width: '30px'}} />
                                    <h2>5</h2>
                                    <h2>$70</h2>
                                </div>
                                <div className='d-flex justify-content-around bg-light p-4 my-4 rounded align-items-center'>
                                    <img src={image} alt="" className='w-25' />
                                    <h2>{rideName}</h2>
                                    <img src="https://i.ibb.co/M1PMd22/peopleicon.png" alt="" style={{width: '30px'}} />
                                    <h2>5</h2>
                                    <h2>$70</h2>
                                </div>
                                <div className='d-flex justify-content-around bg-light p-4 my-4 rounded align-items-center'>
                                    <img src={image} alt="" className='w-25' />
                                    <h2>{rideName}</h2>
                                    <img src="https://i.ibb.co/M1PMd22/peopleicon.png" alt="" style={{width: '30px'}} />
                                    <h2>5</h2>
                                    <h2>$70</h2>
                                </div>
                            </div>
                        }
                        </div>
                    </div>
                    <div className="col-md-6 g-4">
                        <img src="https://i.ibb.co/T8XhwcM/Map.png" className='img-fluid' alt=""/>
                    </div>
                </Row>
            </Container>
        </div>

    );
};

export default Destination;