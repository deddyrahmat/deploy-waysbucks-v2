import React, { Fragment,useEffect, useState } from 'react';

// import axios from "axios";
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// component
import Header from '../../components/Home/Header'
import Orders from '../../components/Home/Orders';
import Navigation from '../../components/Navigations'
import {API} from "../../config/API/index";
import Loading from "../../components/Loading";

import "./LandingPage.scss";

const LandingPage = () => {

    const [productsItems, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchProducts = async ( ) => {
        
        // const response = await axios.get("http://localhost:5000/api/v1/products")

        const response = await API("/products");

        if (response.status == 200) {
            setProducts(response.data.data.products);
            setLoading(false)
            
        }

    }

    // useEffect adalah lifecicle untuk stateless component
    useEffect(() => {
        // code untuk menampilkan data dari api
        fetchProducts();
    }, [])//saat menuliskan dependency [] kosong maka pemanggilan api hanya dilakukan sekali saja


    console.log("ta",productsItems);
    return loading ? <Loading /> :
    (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Header />
                    <h3 className="lets-order">Let’s Order</h3>
                    <Row>
                        {
                            productsItems.map((product) => (
                                <Col md="3" key={product.id}>
                                    <Link 
                                        to={(`/detail/${product.id}`)}
                                        className="text-decoration-none"
                                    >

                                        <Orders  product={product} />
                                    </Link>
                                </Col>
                            )).reverse()
                        }
                    </Row>
                </div>
        </Fragment>
    )
}

export default  LandingPage;