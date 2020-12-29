import React, { Fragment, useState, useContext } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom';

// component
import Loading from "../../Loading";
import {AppContext} from "../../../context/appContext";
import {API} from "../../../config/API";

const FormCart = (props) => {

  const router = useHistory();

  const [state, dispatch] = useContext(AppContext) ;  

  const {preview, raw} = props.image;
  const {totalIncome} = state;

  const [pay, setPay] = useState({
    fullname : '',
    email : '',
    phone : '',
    poscode : '',
    address : ''
  })

  const [loading, setLoading] = useState(true);

  const handleChangePay = (e) => {
    setPay({...pay,  [e.target.name] : e.target.value})
  }

  const handlePay = async (e) => {
    e.preventDefault();

    const {
      fullname,
      email,
      phone,
      poscode,
      address
    }  = pay;

    try {

      const products = JSON.stringify(
        state.carts.map((product) => {
          return { 
            id: product.id, amount: product.amount, topings : [product.topings] 
          };
        })
      );


      const body = new FormData();
      body.append("name", fullname);
      body.append("email", email);
      body.append("phone", phone);
      body.append("posCode", poscode);
      body.append("address", address);
      body.append("income", totalIncome);
      body.append("products", products);

      if (preview !== []) {
        body.append("photo", raw)
      }else{
        return alert("Choose Your Photo attachment")
      }

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        
        const response = await API.post("/transaction", body, config);
        if (response.status == 200) {
          dispatch({
            type : "USER_LOADED",
            payload : state
          })

          setLoading(false);
        }

        // karna setelah diupload datanya tidak langsung muncul di page home, maka ku arahkan ke landing page agar di refresh dan diarahkan ke dashboard
        router.push("/profile")
    } catch (err) {
      console.log(" your system error : ",err);
    }
  }

  console.log("preview", preview);
  console.log("change order", pay);
    return (
        <Fragment>
            <Form onSubmit={handlePay}>
                  <FormGroup>
                    <Input type="text" name="fullname" id="fullname" placeholder="fullname" onChange={handleChangePay} className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Email" onChange={handleChangePay} className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="number" name="phone" id="phone" placeholder="Phone" onChange={handleChangePay} className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" name="poscode" id="poscode" placeholder="Pos Code" onChange={handleChangePay} className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="textarea" name="address" id="address" placeholder="Address" onChange={handleChangePay} className={props.btn_formAuth} />
                  </FormGroup>
                  
                  <Button block color="danger" type="submit" className={props.btn_clickAuth}>Pay</Button>
                </Form>
        </Fragment>
    )
}

export default FormCart;