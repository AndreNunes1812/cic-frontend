import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import { Form, Button, ButtonGroup, Row, Col } from "react-bootstrap";

import api from "../service/api";

import "./styles.css";

const initialFormState = {
  vendedor_id: '',
  nome: '',
  arquivo: '',

  ativo: "S",
};

const Catalogo = () => {

  const [catalagos, setCatalagos] = useState(initialFormState);
  const [catalagoLivro] = useState([]);
  const [chk, setChk] = useState(true);
  const [locationAtivo, setLocationAtivo] = useState("");
  const [selectedVendedor, setSelectedVendedor] = useState('0');


  const location = useLocation();
  const history = useHistory();


  useEffect(() => {
    const loadVendedor = async () => {
      const listaVendedor = await api.get('vendedores');      
      setSelectedVendedor(listaVendedor.data);      
    }
    loadVendedor()
  }, []);


  useEffect(() => {
    if (location.state !== undefined) {
      setCatalagos(location.state.data);
    }
  }, [location]);

  const handleAtualizar = useCallback(() => {
    if (locationAtivo === "S") {
      setChk(true);
    } else {
      setChk(false);
    }
  }, [locationAtivo]);

  useEffect(() => {
    if (location.state !== undefined) {
      setLocationAtivo(location.state.data.ativo);
      handleAtualizar();
    }
  }, [handleAtualizar, location.state, locationAtivo]);

  const handleClickNovo = () => {
    document.getElementById("form-id").reset();
    setCatalagos(initialFormState);
    setChk(true);
    history.push("/catalagos");
  };
  const handleSalvar = async (registro) => {
 /*   try {
      const response =
        registro.id !== undefined
          ? await api.put(`/marca/${registro.id}`, registro)
          : await api.post(`/marca`, registro);
      setCurrentMarca(response.data);
    } catch (error) {}
    */
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCatalagos({ ...catalagos, [name]: value });
  };

  const handleAtivo = () => {
    setCatalagos({
      ...catalagos,
      ativo: catalagos.ativo === "S" ? "N" : "S",
    });
  };

  function handleSelectedVendedor(event) {
    const seg = event.target.value;
    setSelectedVendedor(seg);
  }


  function handleChange() {
    setChk(!chk);
    handleAtivo();
  }

  return (
      <Container fluid="md">
        <Form id="form-id">
          <Row style={{ paddingTop: 5 }}>
            <Col sm={8}>
              <div
                style={{
                  backgroundColor: "rgb(40,36,52)",
                  height: 35,
                  width: "152%",
                }}
              >
                <h3>Cadastro de Catalogos de Livros - {catalagos.id}</h3>
              </div>
            </Col>
            <Col sm={4}>
              <ButtonGroup aria-label="Basic example">
                <Button
                  onClick={handleClickNovo}
                  style={{ backgroundColor: "#7159c1", border: "none" }}
                >
                  Novo
                </Button>
                <Button
                  onClick={() => handleSalvar(catalagos)}
                  style={{
                    backgroundColor: "#7159c1",
                    border: "none",
                    marginLeft: 5,
                  }}
                >
                  Salvar
                </Button>

                <Button
                  onClick={() => history.push("/")}
                  style={{
                    backgroundColor: "#7159c1",
                    border: "none",
                    marginLeft: 5,
                  }}
                >
                  Voltar
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          <Row style={{ paddingTop: "10px" }}>
          <Col sm={4}>
              <Form.Group>
                <Form.Label>Vendedor</Form.Label>
                <Form.Control 
                  as="select"
                  id="vendedor_id"
                  name="vendedor_id"
                  onChange={handleSelectedVendedor}
                  value={selectedVendedor}
                >
                  <option value={"0"}>Selecione</option>
                  {
                    catalagoLivro.map(seg => {
                    return <option key={String(seg.id)} onChange={handleSelectedVendedor} value={seg.id}>{seg.nome}</option>
                    })
                  }

                </Form.Control>
              </Form.Group>
            </Col> 
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Adcionar catalago(s)</Form.Label>
                <Form.Control
                  value={catalagos.vendedor}
                  type="text"
                  id="vendedor"
                  name="vendedor"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
  

            <Col sm={4}>
              <Form.Group>
                <Form.Check.Label style={{ padding: 25 }}>
                  Ativo
                </Form.Check.Label>
                <input
                  type={"checkbox"}
                  checked={chk}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
  );
};

export default Catalogo;
