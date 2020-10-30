import React from "react";
import ProductTable from "./ProductTable";
import { Container } from "react-bootstrap";

const Business = ({ products }: any) => {
  return (
    <Container>
      <ProductTable products={products} />
    </Container>
  );
};
export default Business;
