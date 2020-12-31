import React, { Fragment,useEffect, useState, useContext } from 'react';

// import axios from "axios";
import { Link } from 'react-router-dom';
import { Col, Input, Row } from 'reactstrap';

// component
import Header from '../../components/Home/Header'
import Orders from '../../components/Home/Orders';
import Navigation from '../../components/Navigations'
import {API} from "../../config/API/index";
import Loading from "../../components/Loading";
import {AppContext} from "../../context/appContext";

import "./LandingPage.scss";

import Search from '../../assets/img/icons/search.png';

const LandingPage = () => {

    const [state, dispatch] = useContext(AppContext);

    const [productsItems, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');

    const [loading, setLoading] = useState(true);

    const [filteredPost, setFilterPost] = useState([]);

    const handleSearch = (e) => {
        setKeyword(e.target.value)
    }

    console.log("keyword",keyword);
    console.log("keyword tipe",typeof(keyword));


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
    }, [state])//saat menuliskan dependency [] kosong maka pemanggilan api hanya dilakukan sekali saja


    // =============================================================
    // fitur search all post
    // =============================================================

    useEffect(() => {
        setFilterPost(
        productsItems.filter((product) =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
            // product.name.toLowerCase().includes(keyword.toLowerCase())
        )
        );
    }, [keyword, productsItems]);
    // =============================================================
    // fitur search all post
    // =============================================================

    console.log("data order",productsItems);
    console.log("data f",filteredPost);
    return loading ? <Loading /> :
    (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Header />

                    <Row className="mt-3">
                        <Col md="4">
                            <h3 className="lets-order">Let’s Order</h3>
                        </Col>
                        <Col md={{size: 3, offset:5}} className="text-right">
                            <div className="form-group has-search">
                                <span className="form-control-feedback"> <img src={Search} alt="search"></img> </span>
                                <Input type="text" name="seacrh" id="examplePassword" placeholder="Seacrh Menu" onChange={handleSearch} />
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        {
                            filteredPost.length == 0 ? (
                                <h3 className="text-danger font-weight-bold mx-auto mt-3">Not Found</h3>
                            ) : (
                                filteredPost.map((product) => (
                                    <Col md="3" key={product.id}>
                                        <Link 
                                            to={(`/detail/${product.id}`)}
                                            className="text-decoration-none"
                                        >

                                            <Orders  product={product} />
                                        </Link>
                                    </Col>
                                )).reverse()
                            )
                        }
                    </Row>
                </div>
        </Fragment>
    )
}

export default  LandingPage;