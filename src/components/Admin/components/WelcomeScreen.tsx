import React from "react";
import { Button, Modal, Paper, Input } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";

interface Props {
  show: boolean;
  handleClose: any;
}

interface Executive {
  name: string;
  lastname: string;
  email: string;
  password: string;
  nick: string;
  role: string;
}

const ExecutiveModal = ({ show, handleClose }: Props) => {
  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = React.useState("Registrar");

  const onSubmit = async ({ email, lastname, name, password }: Executive) => {
    // const { data, errors } = await createUser({
    //   variables: { name, email, lastname, password },
    // });
    // if (errors) return console.error(errors);
    // if (data) {
    //   const {
    //     data: {
    //       userLogin: { message, token },
    //     },
    //   } = await userLogin({ variables: { email, password } });
    //   setMessage(message);
    //   handleClose()
    // }
    const randomNick = (nm: string, lt: string) => {
      const randomNumber = Math.round(Math.random() * 9999);
      return `RE#${lt.slice(0, 1)}&${lt.slice(0, 1)}#${randomNumber}`;
    };

    const executive: Executive = {
      name,
      lastname,
      email,
      password,
      role: "EXECUTIVE",
      nick: randomNick(name, lastname),
    };

    console.log(executive);
    handleClose();
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-3">
            <Paper elevation={4}>
              <h1 className="h3 text-center">Crea una cuenta</h1>
              <h2 className="h5 text-center">Es rapido y sencillo</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mt-3 ml-2 mr-2">
                  <div className="col">
                    <Input
                      name="name"
                      error={errors.name ? true : false}
                      inputRef={register({
                        required: true,
                        pattern: /[a-zA-Z]+$/,
                      })}
                      placeholder="Nombre"
                      fullWidth={true}
                    />
                    <span className="text-danger">
                      {errors.name && "Nombre es un campo obligatorio"}
                    </span>
                  </div>
                </div>
                <div className="row mt-3 ml-2 mr-2">
                  <div className="col">
                    <Input
                      name="lastname"
                      error={errors.lastname ? true : false}
                      inputRef={register({
                        required: true,
                        pattern: /[a-zA-Z]+$/,
                      })}
                      placeholder="Apellido"
                      fullWidth={true}
                    />
                    <span className="text-danger">
                      {errors.lastname && "Apellido es un campo obligatorio"}
                    </span>
                  </div>
                </div>
                <div className="row mt-3 ml-2 mr-2">
                  <div className="col">
                    <Input
                      type="email"
                      name="email"
                      error={errors.email ? true : false}
                      inputRef={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      })}
                      placeholder="Correo Electronico"
                      fullWidth={true}
                    />
                    <span className="text-danger">
                      {errors.email &&
                        "Correo electronico es un campo obligatorio"}
                    </span>
                  </div>
                </div>
                <div className="row mt-3 ml-2 mr-2">
                  <div className="col">
                    <Input
                      type="password"
                      error={errors.password ? true : false}
                      name="password"
                      inputRef={register({ required: true })}
                      placeholder="Contraseña"
                      fullWidth={true}
                    />
                    <span className="text-danger">
                      {errors.password && "Contraseña es un campo obligatorio"}
                    </span>
                  </div>
                </div>
                <div className="row mt-3 ml-2 mr-2">
                  <div className="col-md-8 offset-4">
                    <Button type="submit" variant="contained" color="primary">
                      {message}
                    </Button>
                  </div>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const WelcomeScreen = () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <ExecutiveModal show={show} handleClose={() => setShow(false)} />
      <div className="container mt-2">
        <div className="row">
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col" style={{ padding: "50px 50px" }}>
                  User Connected
                </div>
                <div className="col" style={{ padding: "50px 50px" }}>
                  Companies
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ padding: "100px 100px" }}>
                  Top Executives
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col" style={{ padding: "50px 50px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShow(true)}
                  >
                    Nuevo Executivo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
