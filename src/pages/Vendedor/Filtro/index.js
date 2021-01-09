import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import {
  Form,
  Button,
  ButtonGroup,
  Row,
  Col,
  Table,
  Modal,
} from "react-bootstrap";

import "./styles.css";

import api from "../../service/api";

const FiltroVendedor = (props) => {

  const [registros, setRegistros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pergunta, setPergunta] = useState("");
  const [id, setId] = useState(null);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    getDataVendedor();
  }, []);

  const getDataVendedor = async () => {
    const response = await api.get("/vendedor");
    setRegistros(response.data);
  };

  const deleteVendedor = async (id) => {
    await api.delete(`/vendedor/${id}`);
    getDataVendedor();
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setDescricao(value);
  };

  const handleVoltar = (e, registro) => {
    e.preventDefault();
    history.push("/");
  };

  const handleEditar = (e, registro) => {
    e.preventDefault();
    history.push({
      pathname: `/vendedor/${registro.id}`,
      state: { data: registro },
    });
  };

  const handleRemover = (e, registro) => {
    e.preventDefault();
    setShowModal(true);
    setPergunta(`Deseja remover o vendedor: ${''}`);
    setId(`${registro.id}`);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = (deleteID) => {
    setShowModal(false);
    deleteVendedor(deleteID);
  };

  const handleFilter = (filtro) => {
    filter(filtro);
  };

  const filter = async (e) => {

    try {
      const response = await api.get(`/vendedor/description`, {
        params: {
          description: e,
        },
      });

      setRegistros(response.data);
    } catch (error) {}
  };


  const history = useHistory();

  return (
    <>
      <Container fluid="md">
        <Form>
          <Row style={{ paddingTop: 5 }}>
            <Col sm={8}>
              <div
                style={{
                  backgroundColor: "rgb(40,36,52)",
                  height: 35,
                  width: "152%",
                }}
              >
                <h3>Filtros Vendedores</h3>
              </div>
            </Col>
            <Col sm={4}>
              <ButtonGroup aria-label="Basic example">
                <Button
                  style={{ backgroundColor: "#7159c1", border: "none" }}
                  onClick={() => history.push("/vendedor")}
                >
                  Cadastro
                </Button>
                <Button
                  style={{
                    backgroundColor: "#7159c1",
                    border: "none",
                    marginLeft: 5,
                  }}
                  onClick={(event) => handleVoltar(event)}
                >
                  Voltar
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          <Row style={{ paddingTop: "10px" }}>
            <Col sm={11}>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  id="descricao"
                  name="descricao"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col sm={1}>
              <Form.Group controlId="btnpesquisar">
                <Form.Label>:)</Form.Label>
                <Button
                  style={{ backgroundColor: "#7159c1", border: "none" }}
                  onClick={() => handleFilter(descricao)}
                >
                  Filtrar
                </Button>
              </Form.Group>
            </Col>
          </Row>

          <Row style={{ paddingTop: 5 }}>
            <Col sm={8}>
              <div
                style={{
                  backgroundColor: "rgb(40,36,52)",
                  height: 35,
                  width: "152%",
                }}
              >
                <h4>Registros</h4>
              </div>
            </Col>
            <Container style={{ paddingTop: 5, margin: 5 }}>
              <Row style={{ backgroundColor: "#0000" }}>
                <Table
                  responsive
                  style={{
                    backgroundColor: "#ffff",
                    marginLeft: 11,
                    overflow: "scroll",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Ativo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registros.map((reg, index) => {
                      return (
                        <tr key={reg.id}>
                          <td>{reg.nome}</td>
                          <td>{reg.ativo}</td>
                          <td>
                            <ButtonGroup aria-label="Basic example">
                              <Button
                                variant="link"
                                onClick={(event) => handleEditar(event, reg)}
                                style={{
                                  color: "#7159c1",
                                  height: 30,
                                  alignItems: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="link"
                                onClick={(event) => handleRemover(event, reg)}
                                style={{
                                  color: "#7159c1",
                                  height: 30,
                                  alignItems: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                Remover
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </Container>
          </Row>
        </Form>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#000" }}>Title</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "#000" }}>{pergunta}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Näo Remover
            </Button>
            <Button variant="primary" onClick={() => handleDelete(id)}>
              Remover
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default FiltroVendedor;
