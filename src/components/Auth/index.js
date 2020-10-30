import React, { useState } from "react";
import { Input, Button, Paper } from "@material-ui/core";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      message
    }
  }
`;

const USER_REGISTER = gql`
  mutation createUser(
    $name: String
    $lastname: String
    $email: String
    $password: String
  ) {
    createUser(
      input: {
        name: $name
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      _id
      email
    }
  }
`;

export function Login() {
  const [userLogin] = useMutation(USER_LOGIN);
  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = useState("Iniciar Sesion");

  const onSubmit = async ({ email, password }) => {
    const {
      data: {
        userLogin: { message, token },
      },
    } = await userLogin({ variables: { email, password } });
    if (message === "Ban") {
      setMessage("Error, Contactar a soporte.");
    } else {
      setMessage(message);
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);
      window.location.href = "/";
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-3'>
          <Paper elevation={4}>
            <h1 className='h3 text-center'>Inicia sesión en AppStore</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col'>
                  <Input
                    type='email'
                    name='email'
                    fullWidth='true'
                    autoComplete='true'
                    inputRef={register({ required: true })}
                    placeholder='Correo electronico'
                  />
                  <span className='text-danger'>
                    {errors.email &&
                      "Correo electronico es un campo obligatorio"}
                  </span>
                </div>
              </div>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col'>
                  <Input
                    type='password'
                    name='password'
                    autoComplete='true'
                    fullWidth='true'
                    inputRef={register({ required: true })}
                    placeholder='Contraseña'
                  />
                  <span className='text-danger'>
                    {errors.password && "Contraseña es un campo obligatorio"}
                  </span>
                </div>
              </div>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col-md-8 offset-4'>
                  <Button type='submit' variant='contained' color='primary'>
                    {message}
                  </Button>
                </div>
              </div>
            </form>
            <div className='mt-5'>
              <h2 className='h5 text-center'>
                ¿No tienes una cuenta aún?{" "}
                <Button
                  color='primary'
                  component={Link}
                  variant='outlined'
                  to='/sign-up'
                >
                  Registrate
                </Button>
              </h2>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const [userLogin] = useMutation(USER_LOGIN);
  const [createUser] = useMutation(USER_REGISTER);
  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = useState("Registrar");

  const onSubmit = async ({ name, email, lastname, password }) => {
    const { data, error } = await createUser({
      variables: { name, email, lastname, password },
      onError: (e) => {
        console.log(e);
      },
    });
    if (error) return console.error(error);
    if (data) {
      const {
        data: {
          userLogin: { message, token },
        },
      } = await userLogin({ variables: { email, password } });
      setMessage(message);
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);
      window.location.href = "/";
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-3'>
          <Paper elevation={4}>
            <h1 className='h3 text-center'>Crea una cuenta</h1>
            <h2 className='h5 text-center'>Es rapido y sencillo</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col'>
                  <Input
                    name='name'
                    inputRef={register({ required: true })}
                    placeholder='Nombre'
                    fullWidth='true'
                  />
                  <span className='text-danger'>
                    {errors.name && "Nombre es un campo obligatorio"}
                  </span>
                </div>
              </div>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col'>
                  <Input
                    name='lastname'
                    inputRef={register({ required: true })}
                    placeholder='Apellido'
                    fullWidth='true'
                  />
                  <span className='text-danger'>
                    {errors.lastname && "Apellido es un campo obligatorio"}
                  </span>
                </div>
              </div>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col'>
                  <Input
                    type='email'
                    name='email'
                    inputRef={register({ required: true })}
                    placeholder='Correo Electronico'
                    fullWidth='true'
                  />
                  <span className='text-danger'>
                    {errors.email &&
                      "Correo electronico es un campo obligatorio"}
                  </span>
                </div>
              </div>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col'>
                  <Input
                    type='password'
                    name='password'
                    inputRef={register({ required: true })}
                    placeholder='Contraseña'
                    fullWidth='true'
                  />
                  <span className='text-danger'>
                    {errors.password && "Contraseña es un campo obligatorio"}
                  </span>
                </div>
              </div>
              <div className='row mt-3 ml-2 mr-2'>
                <div className='col-md-8 offset-4'>
                  <Button type='submit' variant='contained' color='primary'>
                    {message}
                  </Button>
                </div>
              </div>
            </form>
            <div className='mt-5'>
              <h2 className='h5 text-center'>
                ¿Ya tienes una cuenta?{" "}
                <Button
                  color='primary'
                  component={Link}
                  variant='outlined'
                  to='/login'
                >
                  Iniciar sesion
                </Button>
              </h2>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
