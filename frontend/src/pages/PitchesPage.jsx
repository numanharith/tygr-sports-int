import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPitches } from '../actions/pitchActions';
import { Row, Col } from 'react-bootstrap';
import Pitch from '../components/Pitch';
import Loader from '../components/Loader';
import Message from '../components/Message';

function PitchesPage() {
    const dispatch = useDispatch();
    const pitchList = useSelector((state) => state.pitchList);
    const { error, loading, pitches } = pitchList;

    useEffect(() => {
        dispatch(listPitches());
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {pitches.map((pitch) => (
                        <Col key={pitch.id} sm={12} md={6} lg={4} xl={3}>
                            <Pitch pitch={pitch} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default PitchesPage;
