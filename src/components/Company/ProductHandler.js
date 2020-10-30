import React, { useState } from "react";
import { Button, Input, Container } from "@material-ui/core";
import { Card } from "react-bootstrap";
// import {
//   Edit,
//   Save,
//   CloudUpload,
//   DescriptionRounded,
// } from "@material-ui/icons";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

const NEW_PRODUCT = gql`
  mutation($input: productInput) {
    createProduct(input: $input) {
      title
      description
    }
  }
`;

const FIND_PRODUCT = gql`
  query findProduct($id: ID) {
    getProduct(id: $id) {
      title
      description
      imageURL
      stock
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation imageUpdate($_id: ID, $input: productInput) {
    updateProduct(_id: $_id, input: $input) {
      title
      description
      stock
      imageURL
      price
    }
  }
`;

export const EditProduct = ({
  match: {
    params: { id },
  },
}) => {
  const { register, handleSubmit } = useForm();
  const { loading, error, data } = useQuery(FIND_PRODUCT, {
    variables: {
      id: id,
    },
    pollInterval: 1000,
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [imagen, setImage] = useState();

  const onSubmit = async ({ title, description, imageURL, stock, price }) => {
    await updateProduct({
      variables: {
        _id: id,
        input: {
          title,
          description,
          imageURL,
          stock: parseInt(stock),
          price: parseFloat(price),
        },
      },
    });
  };

  if (loading) return null;
  if (error) return <div>Error: {error.message}</div>;
  const {
    getProduct: { title, description, stock, price, imageURL },
  } = data;

  return (
    <Container>
      <div className='row'>
        <div className='col-md-6 offset-3 mt-3'>
          <Card style={{ maxWidth: 365 }}>
            <Card.Img variant='top' src={imagen || imageURL} />
            <Card.Body>
              <div className='container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='row'>
                    <Input
                      name='title'
                      placeholder='Titulo'
                      defaultValue={title}
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      name='description'
                      placeholder='Descripcion del producto'
                      defaultValue={description}
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      type='number'
                      name='stock'
                      placeholder='Stock'
                      defaultValue={stock}
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      name='price'
                      placeholder='Precio'
                      defaultValue={price}
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      placeholder='Direccion URL de la imagen'
                      name='imageURL'
                      inputRef={register}
                      className='mt-3 col'
                      onChange={(e) => {
                        setImage(e.target.value);
                      }}
                    />
                  </div>

                  <div className='row'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      className='mt-3 mb-3 col'
                    >
                      Guardar
                    </Button>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export const CreateProduct = () => {
  const [newProductCreate] = useMutation(NEW_PRODUCT);
  const [redirect, setRedirect] = useState(false);
  const [imageURL, setImage] = useState(
    "https://res.cloudinary.com/dinels/image/upload/v1603020508/notFoundImageDefault.jpg"
  );
  const { register, handleSubmit } = useForm();

  const newProduct = async ({ title, description, stock, price, imageURL }) => {
    const r = window.confirm("Seguro que quieres crear un nuevo producto?");
    if (r) {
      const companyId = localStorage.getItem("companyId");
      const res = await newProductCreate({
        variables: {
          input: {
            title,
            description,
            companyId,
            stock: parseInt(stock),
            price: parseFloat(price),
            imageURL,
          },
        },
      });
      return res ? setRedirect(true) : null;
    }
  };

  if (redirect) return <Redirect to='/' />;

  return (
    <Container>
      <div className='row'>
        <div className='col-md-6 offset-3 mt-3'>
          <Card style={{ maxWidth: 365 }}>
            <Card.Img variant='top' src={imageURL} />
            <Card.Body>
              <div className='container'>
                <form onSubmit={handleSubmit(newProduct)}>
                  <div className='row'>
                    <Input
                      name='title'
                      placeholder='Titulo'
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      name='description'
                      placeholder='Descripcion del producto'
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      type='number'
                      name='stock'
                      placeholder='Stock'
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      name='price'
                      placeholder='Precio'
                      inputRef={register}
                      className='mt-3 col'
                    />
                  </div>
                  <div className='row'>
                    <Input
                      placeholder='Direccion URL de la imagen'
                      name='imageURL'
                      inputRef={register}
                      className='mt-3 col'
                      onChange={(e) => {
                        setImage(e.target.value);
                      }}
                    />
                  </div>

                  <div className='row'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      className='mt-3 mb-3 col'
                    >
                      Guardar
                    </Button>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};
