import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      message
    }
  }
`;

const USER_REGISTER = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      message
    }
  }
`;

export function Login() {
  const [userLogin] = useMutation(USER_LOGIN);
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("Iniciar Sesion");

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  const onSubmit = async ({ email, password }) => {
    const {
      data: {
        userLogin: { message, token },
      },
    } = await userLogin({ variables: { email, password } });
    setMessage(message);
    localStorage.setItem("token", token);
  };

  return (
    <>
      <div onClick={handleShow}>Iniciar Sesion</div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Correo Electronico</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    ref={register({ required: true })}
                    placeholder='Correo Electronico'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    ref={register({ required: true })}
                    placeholder='Contraseña'
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

export function Register() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Registrar");
  const [dateBirth, setDateBirth] = useState(new Date());

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const newAccount = async (e) => {
    e.preventDefault();
    console.log({ name, email, lastname, password, dateBirth });
  };

  return (
    <>
      <div onClick={handleShow}>Registro</div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={newAccount}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Nombre'
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    name='lastname'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder='Apellido'
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Correo Electronico</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Correo Electronico'
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Contraseña'
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <DatePicker
                  selected={dateBirth}
                  onChange={(date) => setDateBirth(date)}
                />
              </Col>
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
