import React, { Component } from "react";
import Cookies from "js-cookie";
import { CompanyBar, GuestBar } from "./components/AppBar";

export default class Navigation extends Component {
  onClick = () => {
    let r = window.confirm("Cerrar Sesion?");
    if (r) {
      Cookies.remove("jwt");
      window.location.reload();
    }
  };

  render() {
    const {
      user: { role, name },
      company,
    } = this.props;

    if (role === "GUEST") {
      return <GuestBar />;
      // } else if (role === "USER") {
      //   return (
      //     <Navbar expand='lg' variant='dark' bg='dark'>
      //       <Container>
      //         <Link to='/' className='navbar-brand'>
      //           {name}
      //         </Link>
      //         <div className='d-flex justify-content-between align-items-center'>
      //           <Link
      //             to='/settings'
      //             className='btn btn-link btn-secondary text-white mr-2'
      //           >
      //             <i className='fas fa-tools'></i>
      //           </Link>
      //           <Button variant='secondary' onClick={this.onClick}>
      //             <i className='fas fa-sign-out-alt'></i>
      //           </Button>
      //         </div>
      //       </Container>
      //     </Navbar>
      //   );
    }
    if (role === "COMPANY") {
      return <CompanyBar company={company} logout={this.onClick} />;
    }
  }
}
