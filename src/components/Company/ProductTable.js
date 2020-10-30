import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { useMutation, gql } from "@apollo/client";

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID, $input: productInput) {
    updateProduct(_id: $id, input: $input) {
      _id
      title
      description
      stock
      active
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(_id: $id) {
      message
    }
  }
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductTable({ products }) {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const classes = useStyles;

  return (
    <TableContainer component={Paper} className='mt-2'>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell align='right'>Stock</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='center'>Activo</TableCell>
            <TableCell align='center'>Editar</TableCell>
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
              <TableCell align='right'>${product.price}</TableCell>
              <TableCell align='center'>
                {product.active ? (
                  <Button
                    color='primary'
                    onClick={() => {
                      const r = window.confirm("Desactivar producto?");
                      if (r)
                        updateProduct({
                          variables: {
                            id: product._id,
                            input: { active: false },
                          },
                        });
                    }}
                  >
                    Si
                  </Button>
                ) : (
                  <Button
                    color='secondary'
                    onClick={() => {
                      const r = window.confirm("Activar producto?");
                      if (r)
                        updateProduct({
                          variables: {
                            id: product._id,
                            input: { active: true },
                          },
                        });
                    }}
                  >
                    No
                  </Button>
                )}
              </TableCell>
              <TableCell align='center'>
                <Button
                  color='primary'
                  component={RouterLink}
                  to={`/product/edit/${product._id}`}
                >
                  Editar
                </Button>
              </TableCell>
              <TableCell align='center'>
                <Button
                  color='secondary'
                  onClick={() => {
                    const r = window.confirm("Eliminar producto?");
                    if (r) deleteProduct({ variables: { id: product._id } });
                  }}
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
