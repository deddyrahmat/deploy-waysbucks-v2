// memanggil component landing sesuai kondisi auth user 
// buat conts untuk menentukan status login user

import React, { Fragment,useState,useContext } from 'react'
import {  useHistory} from "react-router-dom";


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container
} from 'reactstrap';

// component
import {AppContext} from "../../context/appContext";
import LandingGuest from './LandingGuest'
import Logo from "../../assets/img/logo/Logo.png";
import LandingUser from './LandingUser';
import LandingAdmin from './LandingAdmin';

// Style css

import "./Navigation.scss";
import { Link } from 'react-router-dom';



const Navigation = (props) => {

  const router = useHistory();

  // handle context global
  const [state] = useContext(AppContext);

  // const [auth, setAuth] = useState("guest");

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // kondisi utnuk antisipasi user untuk bypass url
  // if (state.isLogin) {
  //       router.push('/home')
  //   }else{
  //       router.push('/')    
  //   }

  // console.log(state);
  const loged = () => {
    if (state.isLogin) {
      if(state.role === "user"){
        return <LandingUser />
      }else if (state.role === "admin") {
        return <LandingAdmin />
      }
    }
    else{
      return <LandingGuest />
    }
  }

  const imgLogo = <NavbarBrand> <img src={Logo} width="80%" alt="logo"></img> </NavbarBrand> ;

  return (
    <Fragment>            
      <Navbar light expand="md" className="Navigation">
        <Container>
          
          {state.role === 'admin' ? (
            <Link to="/admin">
              {imgLogo}
            </Link>
          ) : (
            <Link to="/">
              {imgLogo}
            </Link>
          ) }
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/* Jika role == guest show halaman login. jika sudah login sebagai user, show cart. jika login sebgai admin, show dashboard admin*/}
            {loged()}
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}


export default  Navigation;

