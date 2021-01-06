import React from "react";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();

  const handleClickVendedor=()=> {
    history.push("/vendedor");
  }

  const handleClickAdcionar=()=> {
    history.push("/catalagos");
  }

  return (
      <Container fluid="xl" >
        <h2>Marketplace de livros CIC</h2>
        <br/>
        <Row>
          <Col sm={4}>
            <Button onClick={handleClickVendedor} style={{ backgroundColor: '#7159c1', border: 'none' }}>Cadastrar Vendedor</Button>        
          </Col>
          <Col sm={4}>
            <Button onClick={handleClickAdcionar} style={{ backgroundColor: '#7159c1', border: 'none' }}> Adcionar catalogos de Livros</Button>        
          </Col>
          <Col sm={4}>
            <Button style={{ backgroundColor: '#7159c1', border: 'none' }} >Submeter Livros</Button>        
          </Col>
          
        </Row>
        
        
      </Container>
  );
};

export default Pages;
