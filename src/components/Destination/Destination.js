import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { fakeData } from '../../fakeData';
import DestinationDetails from '../DestinationDetails/DestinationDetails';
import Header from '../Header/Header';
import './Destination.css';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const Destination = () => {
    const [destination, setDestination] = useState({
        pickFrom: '',
        pickTo: '',
        date: ''
    });
    const [search, setSearch] = useState(false);
    const { id } = useParams();
    const { image, rideName } = fakeData.find(ride => ride.id === parseInt(id));
    const handleBlur = (e) => {
        const newDestination = { ...destination };
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination);
    }
    const handleDate = (e) => {
        const newDestination = { ...destination };
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination);
    }
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            <Marker
                position={{ lat: -34.397, lng: 150.644 }}
            />
        </GoogleMap>
    ));
    return (
        <div>
            <Header />
            <Container>
                <hr />
                <Row>
                    <div className="col-md-6 g-4 my-3">
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
                                <>
                                    <div className='bg-danger p-4 text-white rounded'>
                                        <h2>{destination.pickFrom}</h2>
                                        <p>To,</p>
                                        <h2>{destination.pickTo}</h2>
                                        <h4>Date: {destination.date} </h4>
                                    </div>
                                    <DestinationDetails image={image} rideName={rideName} ></DestinationDetails>
                                    <DestinationDetails image={image} rideName={rideName} ></DestinationDetails>
                                    <DestinationDetails image={image} rideName={rideName} ></DestinationDetails>
                                </>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 g-4 my-3">
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDU5AL0YQHz2kS6vZwyYJKDZtEbICHImA8&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </Row>
            </Container>
        </div>

    );
};

export default Destination;