// page add Toping by admin

import React, { Fragment } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import "./FormToping.scss";

// images
import IconUpload from "../../../assets/img/icons/fileUpload.png";

const FormToping = (props) => {
    return (
        <Fragment>
            <Form>
              <FormGroup>
                <Input type="text" name="nameToping" id="nameToping" placeholder="Name Toping" className={props.btn_formAuth} />
              </FormGroup>
              <FormGroup>
                <Input type="number" name="price" id="price" placeholder="Price" className={props.btn_formAuth} />
              </FormGroup>
              <Label className="file">
                <Input className="file-input" type="file" placeholder="Photo Toping" />
                <p className="file-title"> Photo Toping </p>
                <img src={IconUpload} alt="icon Upload" className="file-img"></img>                
              </Label>
              
              <Button color="danger" className={props.btn_clickAuth}>Add Product</Button>
            </Form>
        </Fragment>
    )
}

export default  FormToping;