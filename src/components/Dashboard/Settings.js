import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import CreateCompany from "./CreateCompany";

export default class Settings extends Component {
  render() {
    const { user } = this.props;
    return (
      <Card>
        <Card.Header>Configuracion</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <CreateCompany user={user} />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>Stats</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
