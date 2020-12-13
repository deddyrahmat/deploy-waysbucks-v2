// page add product by admin

import React, { Fragment } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import "./FormProduct.scss";

// images
import IconUpload from "../../../assets/img/icons/fileUpload.png";

const FormProduct = (props) => {
    return (
        <Fragment>
            <Form>
              <FormGroup>
                <Input type="text" name="nameProduct" id="nameProduct" placeholder="Name Product" className={props.btn_formAuth} />
              </FormGroup>
              <FormGroup>
                <Input type="number" name="price" id="price" placeholder="Price" className={props.btn_formAuth} />
              </FormGroup>
              <Label className="file">
                <Input className="file-input" type="file" placeholder="Photo Product" />
                <p className="file-title"> Photo Product </p>
                <img src={IconUpload} alt="icon Upload" className="file-img"></img>                
              </Label>
              
              <Button color="danger" className={props.btn_clickAuth}>Pay</Button>
            </Form>
        </Fragment>
    )
}

export default  FormProduct;