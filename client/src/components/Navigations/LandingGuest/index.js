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

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

  const { email, password } = formData;

  const router = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  console.log(formData);

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
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
  

  return (
    <Fragment>
      {/* form modal login */}
      <NavItem className="mt-2">
          <NavLink>
            <Button outline color="danger" className="btn-auth" onClick={toggleLogin}>Login</Button>
            <Modal isOpen={modalLogin} toggle={toggleLogin} className="className">
              <ModalBody>
                <Container>
                <Form onSubmit={handleSubmit}>
                  <h3 className="title-formAuth">Login</h3>
                  <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Email" onChange={(e) => {handleChange(e)}} className="btn-formAuth" value={email} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="password" name="password" id="password" onChange={(e) => {handleChange(e)}} placeholder="Password" className="btn-formAuth" value={password} />
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
      {/* form modal logout */}
      <NavItem className="mt-2">
          <NavLink>
            <Button color="danger" className="btn_auth" onClick={toggleRegister}>Register</Button>
            <Modal isOpen={modalRegister} toggle={toggleRegister} className="className">
              <ModalBody>
                <Container>
                  <Form>
                    <h3 className="title-formAuth">Register</h3>
                    <FormGroup>
                      <Input type="email" name="email" id="email" placeholder="Email" className="btn-formAuth" />
                    </FormGroup>
                    <FormGroup>
                      <Input type="password" name="password" id="password" placeholder="Password" className="btn-formAuth" />
                    </FormGroup>
                    <FormGroup>
                      <Input type="text" name="fullname" id="fullname" placeholder="Fullname" className="btn-formAuth" />
                    </FormGroup>
                    
                    <Button block color="danger" className="btn-clickAuth" type="button">Register</Button>
                  </Form>
                  <p className="text-center">Already have an account ? Klik <b onClick={loginPage}>Here</b> </p>
              </Container>
              
              </ModalBody>
            </Modal>
          </NavLink>
      </NavItem>
      {/* form modal logout */}
    </Fragment>
  )
}

export default LandingGuest;