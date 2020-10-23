import React, { Component } from "react";
import { Modal, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Input } from "@material-ui/core";
import { development, production } from "../../../env";
const web = process.env.NODE_ENV === "production" ? production : development;

export default class NewProduct extends Component {
  state = {
    show: false,
    title: "",
    description: "",
    message: "Crear",
  };
  handleClose = () => {
    this.setState({ show: false, title: "", description: "" });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newProduct = async (e) => {
    e.preventDefault();
    const r = window.confirm("Seguro que quieres crear un nuevo producto?");
    const { companyId } = this.props;
    if (r) {
      const token = Cookies.get("jwt");
      const { title, description } = this.state;
      const product = {
        title,
        description,
        companyId,
      };
      const res = await axios
        .post(`${web}/company/product`, product, {
          headers: { token },
          withCredentials: true,
        })
        .catch((err) => {
          if (err) this.setState({ message: err.response.data.message });
        });
      if (res) {
        this.setState({ message: res.data.message });
        window.location.reload();
      }
    }
  };

  render() {
    const { show, title, description, message } = this.state;
    const { handleClose, handleShow, newProduct, onChange } = this;
    return (
      <>
        <div onClick={handleShow}>Crear Producto</div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={newProduct}>
              <Input
                placeholder='Nombre'
                defaultValue={title}
                name='title'
                className='mr-2'
                onChange={onChange}
                required
              />
              <Input
                placeholder='Descripcion'
                defaultValue={description}
                name='description'
                onChange={onChange}
                required
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='mt-2'
              >
                {message}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='contained' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
