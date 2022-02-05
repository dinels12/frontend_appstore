import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CreateCompany = () => {
  const { handleSubmit, register } = useForm();

  const newCompany = async (data: any) => {
    const r = window.confirm(
      "Seguro que quieres registrar la cuenta como empresa?"
    );
    if (r) {
      console.log(data);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(newCompany)}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                name="name"
                ref={register}
                placeholder="Nombre de la Empresa"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Ubicacion</Form.Label>
              <Form.Control
                name="location"
                ref={register}
                placeholder="Ubicacion"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block type="submit" variant="primary">
              Crear
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateCompany;
