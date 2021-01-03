import React,{Fragment, useContext, useState, useEffect} from 'react'
import { Col, Row, Button, Form, FormGroup, Input, Label } from 'reactstrap';
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
    // console.log("tes cart:",state);

    const [sub, setSub] = useState(null);//const untuk menyimpan data array sub harga produk

    const [subTotal, setSubTotal] = useState(0);//untuk menyimpan data subtotal belanja

    const [total, setTotal] = useState(0);//untuk menyimpan data total belanja

    // image transactions
    const [image, setImage] = useState({ preview: "", raw: "" });


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
            // let sum = subTotal * state.carts.length
            let sum = subTotal * 1
            setTotal(sum);
            dispatch({
                type : "INCOME",
                payload : sum
            })
        }
    
    }, [subTotal, state.carts])


    // ======================================================
    // handle image transaction
    // ======================================================
    const handleImageTransaction = (e) => {
        if (e.target.files.length) {
        setImage({
            preview : URL.createObjectURL(e.target.files[0]),
            raw : e.target.files[0]
        })
        }
    }

    // console.log("image up",image );
    // ======================================================
    // handle image transaction
    // ======================================================
    // console.log("total awal",total);
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
                                    <Col md="6" className="text-right"> <span className="text-danger">
                                        {/* {state.carts.length} */}
                                        1
                                    </span></Col>
                                </Row>
                                
                                <hr className="border-danger"></hr>

                                <Row>
                                    <Col md="6"><span className="text-danger">Total</span></Col>
                                    <Col md="6" className="text-right"> <span className="text-danger">{total}</span></Col>
                                </Row>
                            </Col>
                            <Col md="5" className="text-center">
                                <Label className="attachment-transaction">
                                    <Input className="d-none" type="file" placeholder="Photo Product" onChange={handleImageTransaction} />
                                    {/* <p className="file-title"> Photo Product </p> */}
                                    <img src={attach} alt="attach file" className="img-fluid float-right"></img>                
                                </Label>
                                {
                                    image.preview && (
                                        <img src={image.preview} alt="attach file" width="50px" className="text-center" onChange={handleImageTransaction}></img>
                                    )
                                }
                                {/* <img src={attach} alt="attach file" className="img-fluid float-right" onChange={handleImageTransaction}></img> */}
                            </Col>
                        </Row>
                    </Col>
                    <Col md="4">
                        {/* <Form>
                            <FormGroup>
                                <Input type="text" name="fullname" id="fullname" placeholder="fullname" className="btn-formAuth" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="Email" className="btn-formAuth" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="phone" id="phone" placeholder="Phone" className="btn-formAuth" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="poscode" id="poscode" placeholder="Pos Code" className="btn-formAuth" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="address" id="address" placeholder="Address" className="btn-formAuth" />
                            </FormGroup>
                            
                            <Button block color="danger" className="btn-clickAuth">Pay</Button>
                        </Form> */}

                        <FormCart btn_auth="btn-auth" btn_formAuth="btn-formAuth" btn_clickAuth="btn-clickAuth" image={image} />
                        
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default Cart;