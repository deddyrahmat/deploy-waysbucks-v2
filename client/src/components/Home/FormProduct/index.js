// page add product by admin

import React, { Fragment, useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody } from 'reactstrap';
import { useHistory, Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import {AppContext} from "../../../context/appContext";

import {API} from "../../../config/API"

// import Loading from "../../Loading";

import "./FormProduct.scss";

// images
import IconUpload from "../../../assets/img/icons/fileUpload.png";

const FormProduct = (props) => {

  const router = useHistory();

  const [state, dispatch] = useContext(AppContext) ;  

  const [product, setProduct] = useState({
    nameProduct : '',
    price : ''
  })

  const [loading, setLoading] = useState(true);

  const handleChangeproduct = (e) => {
    setProduct({...product,  [e.target.name] : e.target.value})
  }
  
  // console.log("nama",product.nameProduct);

  const handleImage = (e) => {
    dispatch({
      type : "IMG_PREVIEW",
      payload : e.target.files[0]
    })
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const {nameProduct, price} = product;
    console.log("harga",price);
    console.log("harga tipe",typeof(price));
    console.log("replace", price.replace(/,/g , ''));

    try {
      const body = new FormData();
      body.append("name", nameProduct);
      body.append("price", parseInt(price.replace(/,/g , '')));

      if (state.previewImage !== []) {
        body.append("photo", state.previewImage)
      }else{
        return alert("Choose Your Photo Post")
      }

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        
        const response = await API.post("/product", body, config);
        if (response.status == 200) {
          setModalSuccess(true);
          dispatch({
            type : "USER_LOADED",
            payload : state
          })

          setLoading(false);
        }

        // karna setelah diupload datanya tidak langsung muncul di page home, maka ku arahkan ke landing page agar di refresh dan diarahkan ke dashboard
        // router.push("/admin")
    } catch (err) {
      console.log(" your system error : ",err);
      setModalFailed(true);
    }

  }

    // modal Success
    const [modalSuccess, setModalSuccess] = useState(false);    
    const toggleSuccess = () => setModalSuccess(!modalSuccess);
    // modal Success

    // modal Failed
    const [modalFailed, setModalFailed] = useState(false);    
    const toggleFailed = () => setModalFailed(!modalFailed);
    // modal Failed

  return (
      <Fragment>
          <Form onSubmit={handleSubmitProduct}>
            <FormGroup>
              <Input type="text" name="nameProduct" id="nameProduct" placeholder="Name Product" className={props.btn_formAuth} onChange={handleChangeproduct} />
            </FormGroup>
            <FormGroup>
              <NumberFormat thousandSeparator={true} style={{paddingLeft:"10px", paddingTop:"5px", paddingBottom:"5px"}} placeholder="Price" name="price" id="price" className={props.btn_formAuth} inputmode="numeric" onChange={handleChangeproduct} />
              {/* <Input type="number" name="price" id="price" placeholder="Price" className={props.btn_formAuth} onChange={handleChangeproduct} /> */}
            </FormGroup>
            <Label className="file">
              <Input className="file-input" type="file" placeholder="Photo Product" onChange={handleImage} />
              <p className="file-title"> Photo Product </p>
              <img src={IconUpload} alt="icon Upload" className="file-img"></img>                
            </Label>
            
            <Button color="danger" className={props.btn_clickAuth}>Add Product</Button>
          </Form>


          <Modal style={{marginTop:"200px"}} isOpen={modalSuccess} toggle={toggleSuccess}>
            <ModalBody>
              <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Created Product Success</p>
            </ModalBody>
            {
              modalSuccess == false ? (
                <Redirect to="/admin" />
              ) : null
            }
          </Modal>
          <Modal style={{marginTop:"200px"}} isOpen={modalFailed} toggle={toggleFailed}>
            <ModalBody>
              <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Created Product Failed</p>
            </ModalBody>
          </Modal>
      </Fragment>
  )
}

export default  FormProduct;