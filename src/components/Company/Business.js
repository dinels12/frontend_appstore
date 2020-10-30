import React from "react";
import ProductTable from "./ProductTable";
import { Container } from "react-bootstrap";

export default function Business({ products }) {
  return (
    <Container>
      <ProductTable products={products} />
    </Container>
  );
}
