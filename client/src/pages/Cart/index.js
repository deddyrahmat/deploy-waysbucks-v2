import React,{Fragment, useContext} from 'react'
import { Col, Row } from 'reactstrap';
import FormCart from '../../components/Home/FormCart';
import OrderCart from '../../components/Home/OrderCart';
import Navigation from '../../components/Navigations';

import {AppContext} from "../../context/appContext";

// Style Css
import "./Cart.scss";

// images
import attach from "../../assets/img/icons/attachement.svg";

const Cart = () => {

    const [state, dispatch] = useContext(AppContext);
    console.log("tes cart:",state);

    return (
        <Fragment>
            <Navigation />
            <div className="mt-4 container-landing">
                <h2 className="title-cart">My Cart</h2>
                <h4 className="review-cart">Review Your Order</h4>
                <Row>
                    <Col md="8">
                        <hr className="border-danger mt-n1"></hr>
                        {
                            state.carts.map(cart => (
                                <OrderCart key={cart.id} cart={cart} />
                            ))
                        }
                        <hr className="border-danger"></hr>
                        <Row>
                            <Col md="7">
                                <hr className="border-danger"></hr>
                                <Row className="mb-2">
                                    <Col md="6"><span className="text-danger">Subtotal</span></Col>
                                    <Col md="6" className="text-right"> <span className="text-danger">69.000</span></Col>
                                </Row>
                                <Row>
                                    <Col md="6"><span className="text-danger">Qty</span></Col>
                                    <Col md="6" className="text-right"> <span className="text-danger">2</span></Col>
                                </Row>
                                
                                <hr className="border-danger"></hr>

                                <Row>
                                    <Col md="6"><span className="text-danger">Total</span></Col>
                                    <Col md="6" className="text-right"> <span className="text-danger">69.000</span></Col>
                                </Row>
                            </Col>
                            <Col md="5" >
                                <img src={attach} alt="attach file" className="img-fluid float-right"></img>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="4">
                        <FormCart btn_auth="btn-auth" btn_formAuth="btn-formAuth" btn_clickAuth="btn-clickAuth" />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default Cart;