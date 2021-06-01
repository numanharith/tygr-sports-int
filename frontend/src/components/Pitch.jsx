import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'

function Pitch({ pitch }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/pitch/${pitch._id}`}>
        <Card.Img src={pitch.image} />
      </Link>

      <Card.Body>
        <Link to={`/pitch/${pitch._id}`}>
          <Card.Title as='div'>
            <strong>{pitch.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='p'>{pitch.address}, {pitch.postalCode}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Pitch;