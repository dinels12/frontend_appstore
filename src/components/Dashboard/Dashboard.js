import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class Dashboard extends Component {
  render() {
    return (
      <Card className='mt-2'>
        <Card.Header>Dashboard</Card.Header>
        <Card.Body>
          <Card>
            <Card.Body>Productos</Card.Body>
          </Card>
        </Card.Body>
      </Card>
    );
  }
}
