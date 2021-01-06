import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";

import { Button, Row, Col } from "react-bootstrap";

// import api from "../../service/api";

import "./styles.css";

/*const initialFormState = {
  name: "",
  preco: 0,
  ativo: "S",
};
*/
const Pages = () => {

  /*const location = useLocation();
  const history = useHistory();
*/
  return (
      <Container fluid="xl" >
        <h2>Marketplace de livros CIC</h2>
        <br/>
        <Row>
          <Col sm={4}>
            <Button>Cadastrar Vendedor</Button>        
          </Col>
          <Col sm={4}>
            <Button>Adcionar catalogos de Livros</Button>        
          </Col>
          <Col sm={4}>
            <Button>Submeter Livros</Button>        
          </Col>
          
        </Row>
        
        
      </Container>
  );
};

export default Pages;
