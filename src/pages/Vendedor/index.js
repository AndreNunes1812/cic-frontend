import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import { Form, Button, ButtonGroup, Row, Col } from "react-bootstrap";

// import api from "../../service/api";

import "./styles.css";

const initialFormState = {
  name: "",
  preco: 0,
  ativo: "S",
};

const Vendedor = () => {

  const [currentMarca, setCurrentMarca] = useState(initialFormState);
  const [chk, setChk] = useState(true);
  const [locationAtivo, setLocationAtivo] = useState("");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state !== undefined) {
      setCurrentMarca(location.state.data);
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
    setCurrentMarca(initialFormState);
    setChk(true);
    history.push("/marca");
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
    setCurrentMarca({ ...currentMarca, [name]: value });
  };

  const handleAtivo = () => {
    setCurrentMarca({
      ...currentMarca,
      ativo: currentMarca.ativo === "S" ? "N" : "S",
    });
  };

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
                <h3>Cadastro de Vendedor - {currentMarca.id}</h3>
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
                  onClick={() => handleSalvar(currentMarca)}
                  style={{
                    backgroundColor: "#7159c1",
                    border: "none",
                    marginLeft: 5,
                  }}
                >
                  Salvar
                </Button>

                <Button
                  onClick={() => history.push("/filtrosmarca")}
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
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  value={currentMarca.name}
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group>
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  value={currentMarca.preco}
                  disabled={true}
                  type="number"
                  id="preco"
                  name="preco"
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

export default Vendedor;
