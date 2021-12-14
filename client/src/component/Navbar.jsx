import React from "react";

import { Container, Navbar, FormControl, Form, Button } from "react-bootstrap";

const Navigation = () => {
  return (
    <>
      <Navbar bg="primary" expand="lg" className="px-5">
        <Container fluid>
          <Navbar.Brand href="/" className="text-light">
            Fruit Bazar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex w-100 mx-5">
              <FormControl
                type="search"
                placeholder="Search fruit,cookies,etc..."
                className="me-2 w-100"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
          <div className="fs-5 text-light mx-5">🛒Cart</div>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
