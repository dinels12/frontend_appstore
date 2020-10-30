import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductContainer = ({ product }: any) => {
  const { imageURL, description, title, price } = product;
  return (
    <Card style={{ width: "16em" }}>
      <Card.Img
        variant='top'
        src={
          imageURL ||
          "https://res.cloudinary.com/dinels/image/upload/v1603020508/notFoundImageDefault.jpg"
        }
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>${price}</Card.Text>
        <Button block variant='primary'>
          Comprar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductContainer;
