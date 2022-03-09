import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
export default function NavBar() {
    let history = useHistory()
    const username = localStorage.getItem('username')
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "http://localhost:3000/"
    }
  return (
    <>
          
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Container >
                  <Navbar.Brand className="navbar-brand"><b>Employee Management App</b></Navbar.Brand>
                  <Navbar.Collapse id="responsive-navbar-nav" style={{ justifyContent: 'space-between' }}>
                      <Nav className="me-auto">
                          <Navbar.Text>Logged in as {username}</Navbar.Text>
                      </Nav>
                      <Nav className='nav-item'>
                          <Nav.Link className='nav-link' onClick={() => handleLogout()}>Logout</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
        
    </>
  )
}




