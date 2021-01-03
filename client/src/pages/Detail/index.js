import React, { Fragment,useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';

// import API
import {API} from "../../config/API";

// component
import { Button, Card, CardImg, Col, Row } from 'reactstrap'
import ItemToping from '../../components/Home/ItemToping';
import Navigation from '../../components/Navigations';

import { AppContext } from '../../context/appContext';


// images
// import Logo from "../../assets/img/logo/Logo.png";


import "./Detail.scss";
import Loading from '../../components/Loading';

const Detail = () => {

    const [state,dispatch] = useContext(AppContext);

    const [product, setProduct] = useState([]);
    const [topings, setTopings] = useState([]);
    const [total, setTotal] = useState(0);
    

    let {id} = useParams();

    const router = useHistory();

    const fetchProduct = async (id) => {
        const response = await API(`/product/${id}`);
        // console.log(response.data.data.product.name);
        setProduct(response.data.data.product);
    }


    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    const fetchTopings = async () => {
        const responseTopings = await API(`/topings`);
        // console.log(responseTopings.data.data.product.name);
        setTopings(responseTopings.data.data.topings);
    }


    useEffect(() => {
        fetchTopings();
    }, []);

    useEffect(() => {
            let priceList = state.isToping.map((prices) => parseInt(prices.price))
            let sum = priceList.reduce((a,b) => a + b, 0)
            let sumTotal = product.price + sum
            setTotal(sumTotal)
    }, [state.isToping])


    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        

        await dispatch({
            type : "ADD_CART",
            payload : id//idproduk 
        });

        await dispatch({
            type : "REMOVE_TOPINGS"
        });
        router.push('/cart');
        
    }

    // ketika keluar dari halaman detail, seluruh toping yang belum di tambahkan ke cart akan hilang
    useEffect(() => {        
        return async () => {
            await dispatch({
                type : "REMOVE_TOPINGS",
                payload : state
            });
        }
    }, [])


    return !product ? (<Loading /> ) :
    (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Row>
                        <Col md="5" >
                            <Card inverse>
                                <CardImg src={product.photo} alt="Card image cap" className="detail-product-order"/>
                                {/* <CardImgOverlay>
                                    <img src={Logo} alt="Logo Product" className="detail-order-logo"></img>
                                </CardImgOverlay> */}
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
                                
                                <Row className="d-flex flex-wrap">
                                        {topings.map((toping) => (
                                            <Col md="3" key={toping.id}>
                                                <ItemToping  toping={toping} />
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
                                            value={
                                                state.isToping.length === 0 ? product.price 
                                                : total
                                            }  
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
                </div>

                
        </Fragment>
    )
}

export default  Detail;