import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const HomePage = () => {

  return (
    <Container>
      <h1 className='center'>
        Revolutionizing Football in Singapore<br></br><i className="fas fa-futbol"></i>
      </h1>
    </Container>
  )
}

export default HomePage
