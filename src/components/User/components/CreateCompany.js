import React, { Component } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default class CreateCompany extends Component {
  state = {
    show: false,
    name: "",
    location: "",
    message: "Registrar Empresa",
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newCompany = async (e) => {
    e.preventDefault();
    const r = window.confirm(
      "Seguro que quieres registrar la cuenta como empresa?"
    );
    if (r) {
    }
  };

  render() {
    const { show, name, location, message } = this.state;
    const { handleClose, handleShow, newCompany, onChange } = this;
    return (
      <>
        <Button variant='secondary' onClick={handleShow} className='mr-2'>
          Registrar como cuenta de empresa
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Registro de Empresa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={newCompany}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control
                      name='name'
                      value={name}
                      onChange={onChange}
                      placeholder='Nombre de la Empresa'
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Ubicacion</Form.Label>
                    <Form.Control
                      name='location'
                      value={location}
                      onChange={onChange}
                      placeholder='Ubicacion'
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button block type='submit' variant='primary'>
                    {message}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
