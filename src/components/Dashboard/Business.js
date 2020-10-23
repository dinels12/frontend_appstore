import React, { Component } from "react";
import ProductTable from "./ProductTable";
import { Container } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { development, production } from "../../env";
const web = process.env.NODE_ENV === "production" ? production : development;

export default class Business extends Component {
  changeStatus = async (productId, command) => {
    const token = Cookies.get("jwt");
    if (command === "TRUE") {
      const product = {
        id: productId,
        active: false,
      };
      const res = await axios
        .put(`${web}/company/product`, product, {
          headers: { token },
          withCredentials: true,
        })
        .catch((err) => {
          if (err) console.log(err.response.data.message);
        });
      if (res) {
        this.props.getUser(token);
      }
    } else if (command === "FALSE") {
      const product = {
        id: productId,
        active: true,
      };
      const res = await axios
        .put(`${web}/company/product`, product, {
          headers: { token },
          withCredentials: true,
        })
        .catch((err) => {
          if (err) console.log(err.response.data.message);
        });
      if (res) {
        this.props.getUser(token);
      }
    } else if (command === "DELETE") {
      const r = window.confirm("Seguro que quieres eliminar el producto?");
      if (r) {
        const res = await axios
          .delete(`${web}/company/product`, {
            headers: { token, id: productId },
            withCredentials: true,
          })
          .catch((err) => {
            if (err) console.log(err.response.data.message);
          });
        if (res) {
          this.props.getUser(token);
        }
      }
    }
  };
  render() {
    return (
      <Container>
        <ProductTable
          products={this.props.products}
          changeStatus={this.changeStatus}
        />
      </Container>
    );
  }
}
