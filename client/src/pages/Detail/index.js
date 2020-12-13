import React, { Fragment,useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import NumberFormat from 'react-number-format';

// import API
import {API} from "../../config/API";

// component
import { Button, Card, CardImg, CardImgOverlay , Col, Row } from 'reactstrap'
import ItemToping from '../../components/Home/ItemToping';
import Navigation from '../../components/Navigations'

// Data Api
import {Topings} from "../../config/FakeData/Topings";

// images
import Logo from "../../assets/img/logo/Logo.png";

import "./Detail.scss";
import Loading from '../../components/Loading';

const Detail = () => {

    const [product, setProduct] = useState([]);

    let {id} = useParams();

    const fetchProduct = async () => {
        const response = await API(`/product/${id}`);
        // console.log(response.data.data.product.name);
        setProduct(response.data.data.product);
    }


    useEffect(() => {
        fetchProduct();
    }, []);

    return !product ? (<Loading /> ) :
    (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Row>
                        <Col md="5" >
                            <Card inverse>
                                <CardImg src={product.photo} alt="Card image cap" className="detail-product-order"/>
                                <CardImgOverlay>
                                    <img src={Logo} alt="Logo Product" className="detail-order-logo"></img>
                                </CardImgOverlay>
                            </Card>
                        </Col>
                        <Col md="7">
                            <h2 className="detail-title-order">{product.name}</h2>
                            <NumberFormat 
                                value={product.price} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp. '} 
                                renderText={
                                    value => <p className="detail-price-order">{value}</p>
                            } />

                            <h4 className="detail-title-toping">Toping</h4>
                            <Row>
                                {
                                    Topings.map((toping) => (
                                        <Col md="3">
                                            <ItemToping key={toping.id} toping={toping} />
                                        </Col>
                                    )).reverse()
                                }
                            </Row>

                            <Row className="detail-result-price">
                                <Col md="6" className="detail-title-result-price text-left">
                                    Total
                                </Col>
                                <Col md="6" className="detail-count-result-price text-right">
                                    <NumberFormat 
                                        value={product.price} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        prefix={'Rp. '} 
                                    />
                                </Col>
                            </Row>
                            <Button color="danger" size="lg" block className="detail-btn-add-cart">Add Cart</Button>
                        </Col>
                    </Row>
                </div>
        </Fragment>
    )
}

export default  Detail;