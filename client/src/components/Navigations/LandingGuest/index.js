// menampilkan navigasi modal login dan register

import React, { Fragment,useState, useContext } from 'react'

import {AppContext} from "../../../context/appContext";

import { useHistory } from "react-router-dom";

import {API,setAuthToken} from "../../../config/API"

// component
import { Button, Container, Form, FormGroup, Input, NavItem,NavLink,Modal, ModalBody } from 'reactstrap';

// Style Css
import "./LandingGuest.scss";

const LandingGuest = () => {

  const [state, dispatch] = useContext(AppContext);

  const [modalLogin, setModalLogin] = useState(false);

  const toggleLogin = () => setModalLogin(!modalLogin);

  const [modalRegister, setModalRegister] = useState(false);

  const toggleRegister = () => setModalRegister(!modalRegister);

  // ============================================
  // Login
  // ============================================

  const [formDataLogin, setFormDataLogin] = useState({
    email : '',
    password : ''
  })

  const { email, password } = formDataLogin;

  const router = useHistory();

  const handleChangeLogin = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  }


  const login = async (email, password) => {
    
        const body = JSON.stringify({ email, password });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        
        const response = await API.post("/login", body, config);
        
        // console.log(response.data.data);

        const result = response.data.data.chanel;
        dispatch({
          type:"LOGIN",
          payload : result
        })

        setAuthToken(result.token);
        
        if (result.role === "user") {
          router.push("/");
        }else if (result.role === "admin") {
          router.push("/admin")
        }
  }
  

  const handleSubmitLogin = async (e) => {
      e.preventDefault();

      try {
        // const { email, password } = formDataLogin;
        login(email, password);
        
      } catch (err) {
        console.log(err);
        setModalFailed(true)
      }
  }


  // ============================================
  // Registrasi
  // ============================================
  const [formDataRegister, setFormDataRegister] = useState({
    fullname : '',
    emailRegis : '',
    passwordRegis : ''
  })

  const { emailRegis, passwordRegis, fullname } = formDataRegister;

  const handleChangeRegis = (e) => {
    setFormDataRegister({ ...formDataRegister, [e.target.name]: e.target.value });
  }  


  const handleSubmitRegister = async (e) => {
      e.preventDefault();

      try {
        let fullname = formDataRegister.fullname;
        let email = formDataRegister.emailRegis;
        let password = formDataRegister.passwordRegis;
        const body = JSON.stringify({ fullname, email, password });
        const bodyLogin = JSON.stringify({ email, password });
        console.log("body : "+body);

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        
        const response = await API.post("/register", body, config);
        
        if (response.status === 200 ) {

          login(email, password);
        }else{
          console.log(response.status)
        }

      } catch (err) {
        console.log(err);
      }
  }


  const loginPage = () => {
    toggleLogin();
    toggleRegister();
  }

  const regisPage = () => {
    toggleLogin();
    toggleRegister();
  }

  const [modalFailed, setModalFailed] = useState(false);

  const toggleFailed = () => setModalFailed(!modalFailed);
  

  return (
    <Fragment>
      {/* form modal login */}
      <NavItem className="mt-2">
          <NavLink>
            <Button outline color="danger" className="btn-auth" onClick={toggleLogin}>Login</Button>
            <Modal isOpen={modalLogin} toggle={toggleLogin} className="size-modal mx-auto">
              <ModalBody>
                <Container>
                <Form onSubmit={handleSubmitLogin}>
                  <h3 className="title-formAuth">Login</h3>
                  <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Email" onChange={(e) => {handleChangeLogin(e)}} className="btn-formAuth" value={email} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" name="password" id="password" onChange={(e) => {handleChangeLogin(e)}} placeholder="Password" className="btn-formAuth" value={password} />
                  </FormGroup>
                  
                  <Button block color="danger" className="btn-clickAuth" type="submit" >Login</Button>
                </Form>
                <p className="text-center">Don't have an account ? Klik <b onClick={regisPage}>Here</b> </p>
              </Container>
              
              </ModalBody>
            </Modal>
          </NavLink>
      </NavItem>
      {/* form modal login */}
      {/* form modal Register */}
      <NavItem className="mt-2">
          <NavLink>
            <Button color="danger" className="btn_auth" onClick={toggleRegister}>Register</Button>
            <Modal isOpen={modalRegister} toggle={toggleRegister} className="size-modal mx-auto">
              <ModalBody>
                <Container>
                  <Form onSubmit={handleSubmitRegister}>
                    <h3 className="title-formAuth">Register</h3>
                    <FormGroup>
                      <Input type="email" name="emailRegis" id="emailRegis" placeholder="Email" className="btn-formAuth" onChange={(e) => {handleChangeRegis(e)}}  value={emailRegis} />
                    </FormGroup>
                    <FormGroup>
                      <Input type="password" name="passwordRegis" id="passwordRegis" placeholder="Password" className="btn-formAuth" onChange={(e) => {handleChangeRegis(e)}}  value={passwordRegis} />
                    </FormGroup>
                    <FormGroup>
                      <Input type="text" name="fullname" id="fullname" placeholder="Fullname" className="btn-formAuth" onChange={(e) => {handleChangeRegis(e)}}  value={fullname} />
                    </FormGroup>
                    
                    <Button block color="danger" className="btn-clickAuth" type="submit">Register</Button>
                  </Form>
                  <p className="text-center">Already have an account ? Klik <b onClick={loginPage}>Here</b> </p>
              </Container>
              
              </ModalBody>
            </Modal>
          </NavLink>
      </NavItem>
      {/* form modal Register */}

      {/* ========================== Modal =============================== */}
      <Modal style={{marginTop:"200px"}} isOpen={modalFailed} toggle={toggleFailed}>
        <ModalBody>
          <p style={{color:"#c70039", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Login Failed</p>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default LandingGuest;