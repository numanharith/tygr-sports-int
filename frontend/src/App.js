import { Container } from 'react-bootstrap'
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <h1>TygrSports</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;