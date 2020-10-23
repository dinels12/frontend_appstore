import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import EditProduct from "./EditProduct";

export default class ProductTable extends Component {
  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  render() {
    const classes = this.useStyles;
    const { products, changeStatus } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell align='right'>Stock</TableCell>
              <TableCell align='right'>Precio</TableCell>
              <TableCell align='right'>Activo</TableCell>
              <TableCell align='center'>Visualizar</TableCell>
              <TableCell align='center'>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell component='th' scope='row'>
                  {product.title}
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell align='right'>{product.stock}</TableCell>
                <TableCell align='right'>{product.price}</TableCell>
                <TableCell align='right'>
                  {product.active ? (
                    <Button
                      color='primary'
                      onClick={() => changeStatus(product._id, "TRUE")}
                    >
                      Si
                    </Button>
                  ) : (
                    <Button
                      color='secondary'
                      onClick={() => changeStatus(product._id, "FALSE")}
                    >
                      No
                    </Button>
                  )}
                </TableCell>
                <TableCell align='center'>
                  <EditProduct product={product} />
                </TableCell>
                <TableCell align='center'>
                  <Button
                    color='secondary'
                    onClick={() => changeStatus(product._id, "DELETE")}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
