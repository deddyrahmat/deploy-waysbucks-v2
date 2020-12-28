// page add product by admin

import React, { Fragment, useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom';

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
  
  console.log("nama",product.nameProduct);

  const handleImage = (e) => {
    dispatch({
      type : "IMG_PREVIEW",
      payload : e.target.files[0]
    })
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const {nameProduct, price} = product;

    try {
      const body = new FormData();
      body.append("name", nameProduct);
      body.append("price", price);

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
          dispatch({
            type : "USER_LOADED",
            payload : state
          })

          setLoading(false);
        }

        // karna setelah diupload datanya tidak langsung muncul di page home, maka ku arahkan ke landing page agar di refresh dan diarahkan ke dashboard
        router.push("/admin")
    } catch (err) {
      console.log(" your system error : ",err);
    }

  }

  return (
      <Fragment>
          <Form onSubmit={handleSubmitProduct}>
            <FormGroup>
              <Input type="text" name="nameProduct" id="nameProduct" placeholder="Name Product" className={props.btn_formAuth} onChange={handleChangeproduct} />
            </FormGroup>
            <FormGroup>
              <Input type="number" name="price" id="price" placeholder="Price" className={props.btn_formAuth} onChange={handleChangeproduct} />
            </FormGroup>
            <Label className="file">
              <Input className="file-input" type="file" placeholder="Photo Product" onChange={handleImage} />
              <p className="file-title"> Photo Product </p>
              <img src={IconUpload} alt="icon Upload" className="file-img"></img>                
            </Label>
            
            <Button color="danger" className={props.btn_clickAuth}>Add Product</Button>
          </Form>
      </Fragment>
  )
}

export default  FormProduct;