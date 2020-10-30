import React from "react";
import { Paper } from "@material-ui/core";

const Settings = ({ user: { name, lastname, nick, lastLogin, email } }) => {
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col'>
          <Paper elevation={3}>
            <div className='container'>
              <h1 className='h3'>Ajustes</h1>
              <div className='row mt-3'>
                <div className='col'>
                  <b>{`${name} ${lastname}`}</b>
                  <br />
                  {email}
                </div>
                <div className='col'>
                  <b>Nombre de usuario:</b>
                  <br />
                  {nick}
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col'>
                  <b>Direccion:</b>
                  <br />
                </div>
                <div className='col'>
                  <b>Numero de Telefono:</b>
                  <br />
                </div>
                <div className='col'>
                  <b>Fecha de nacimiento:</b>
                  <br />
                </div>
                <div className='col'>
                  <b>Ultimo inicio de sesion:</b>
                  <br />
                  {lastLogin}
                </div>
              </div>
              <div className='text-center'>
                <small>
                  Para actualizar la información de tu cuenta, por favor
                  contacta a soporte.
                </small>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Settings;
