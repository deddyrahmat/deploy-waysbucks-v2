import React, { Fragment,useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';

// import API
import {API} from "../../config/API";

// component
import { Button, Card, CardImg, CardImgOverlay , Col, Row } from 'reactstrap'
import ItemToping from '../../components/Home/ItemToping';
import Navigation from '../../components/Navigations';

import { AppContext } from '../../context/appContext';

// Data Dummy Api
import {Topings} from "../../config/FakeData/Topings";

// images
import Logo from "../../assets/img/logo/Logo.png";


import "./Detail.scss";
import Loading from '../../components/Loading';

const Detail = () => {

    const [state,dispatch] = useContext(AppContext);

    const [product, setProduct] = useState([]);

    let {id} = useParams();

    const router = useHistory();

    const fetchProduct = async () => {
        const response = await API(`/product/${id}`);
        // console.log(response.data.data.product.name);
        setProduct(response.data.data.product);
    }


    useEffect(() => {
        fetchProduct();
    }, []);

    const handleAddTopings = (id) => {

        if (state.isLogin) {            
            const filterTopingById = Topings.find(toping => toping.id === id);

            dispatch({
                type : "ADD_TOPING",
                payload : filterTopingById
            });
        }else{
            alert('Please Login or Register')
        }

    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        
        if (!state.isLogin) {
            alert('Please Login or Register')
        }

        await dispatch({
            type : "ADD_CART",
            payload : id
        });

        await dispatch({
                type : "REMOVE_TOPINGS"
            });
            router.push('/');
        
        // alert(id);
    }

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
                            <form onSubmit={handleSubmitOrder}>
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
                                                <ItemToping key={toping.id} toping={toping} handleAddTopings={handleAddTopings}/>
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
                                <Button color="danger" size="lg" block className="detail-btn-add-cart" type="submit">Add Cart</Button>
                            </form>
                        </Col>
                    </Row>
                    <pre>{JSON.stringify(state, null, 2)}</pre>
                </div>
        </Fragment>
    )
}

export default  Detail;