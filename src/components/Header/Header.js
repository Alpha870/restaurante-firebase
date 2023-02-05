import React from 'react'
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/esm/NavLink';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/"><box-icon name='home' color='#ffffff' ></box-icon></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink href="/reservas"><box-icon name='book-open' color='#ffffff'></box-icon></NavLink>
            <NavLink href="/autenticar"><box-icon name='bowl-hot'color='#ffffff'></box-icon></NavLink>
            <NavLink href="/salir"><box-icon name='exit' color='#ffffff'></box-icon></NavLink>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header