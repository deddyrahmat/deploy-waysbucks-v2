import React, { Fragment } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'

// style css mengikut dari component navigations landing guest

const FormCart = (props) => {
    return (
        <Fragment>
            <Form>
                  <FormGroup>
                    <Input type="text" name="fullname" id="fullname" placeholder="fullname" className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Email" className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" name="phone" id="phone" placeholder="Phone" className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" name="poscode" id="poscode" placeholder="Pos Code" className={props.btn_formAuth} />
                  </FormGroup>
                  <FormGroup>
                    <Input type="textarea" name="address" id="address" placeholder="Address" className={props.btn_formAuth} />
                  </FormGroup>
                  
                  <Button block color="danger" className={props.btn_clickAuth}>Pay</Button>
                </Form>
        </Fragment>
    )
}

export default FormCart;