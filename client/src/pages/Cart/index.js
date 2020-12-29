import React,{Fragment, useContext, useState, useEffect} from 'react'
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

    const [sub, setSub] = useState(null);//const untuk menyimpan data array sub harga produk

    const [subTotal, setSubTotal] = useState(0);//untuk menyimpan data subtotal belanja

    const [total, setTotal] = useState(0);//untuk menyimpan data total belanja


    useEffect(() => {
        // proses untuk melakukan seleksi array yang hanya diinginkan
        // tampilkan array sesuai jumlah produk yang dicart
        // contoh [0:12 , 1:3, 2:91, 3:333] sehingga hanya menampilkan data dari index ke 1(3) sampai 2(91)
        setSub(state.subTotal.slice((state.subTotal.length - state.carts.length), state.subTotal.length))
    }, [state.subTotal, state.carts])

    
    // proses pencarian nilai sub total harga produk
    useEffect(() => {
        if (sub !== null) {   
            let sum = sub.reduce((a,b) => a + b, 0)
            setSubTotal(sum);
        }
    
    }, [sub])


    // proses pencarian total belanja keseluruhan
    useEffect(() => {
        if (subTotal !== null) {   
            let sum = subTotal * state.carts.length
            setTotal(sum);
        }
    
    }, [subTotal, state.carts])

    console.log("hasil subTotal : ", sub);
    console.log("hasil subOrder : ", subTotal);
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
                                <OrderCart key={cart.id} cart={cart}/>
                            ))
                        }
                        <hr className="border-danger"></hr>
                        <Row>
                            <Col md="7">
                                <hr className="border-danger"></hr>
                                <Row className="mb-2">
                                    <Col md="6"><span className="text-danger">Subtotal</span></Col>
                                    <Col md="6" className="text-right"> <span className="text-danger">{subTotal}</span></Col>
                                </Row>
                                <Row>
                                    <Col md="6"><span className="text-danger">Qty</span></Col>
                                    <Col md="6" className="text-right"> <span className="text-danger">{state.carts.length}</span></Col>
                                </Row>
                                
                                <hr className="border-danger"></hr>

                                <Row>
                                    <Col md="6"><span className="text-danger">Total</span></Col>
                                    <Col md="6" className="text-right"> <span className="text-danger">{total}</span></Col>
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