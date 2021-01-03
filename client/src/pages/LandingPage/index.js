import React, { Fragment,useEffect, useState, useContext } from 'react';
import { Redirect, useHistory } from "react-router-dom";

// import axios from "axios";
import { Link } from 'react-router-dom';
import { Col, Input, Modal, ModalBody, Row } from 'reactstrap';

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

    const router = useHistory();


    const [state, dispatch] = useContext(AppContext);

    const [productsItems, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');

    const [detailId, setDetailId] = useState(0);
    
    const [loading, setLoading] = useState(true);

    const [filteredPost, setFilterPost] = useState([]);

    const handleSearch = (e) => {
        setKeyword(e.target.value)
    }



    const fetchProducts = async ( ) => {
        
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
    
    const handleDetail = (id) => {
        if (state.isLogin == false) {
            // setDetailId(id)
            setModalCancel(true);
        } 
        else{
            router.push(`/detail/${id}`)
        }
    }

    // modal cancel
    const [modalCancel, setModalCancel] = useState(false);    
    const toggleCancel = () => setModalCancel(!modalCancel);
    // modal cancel

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
                                    <Col md="3" key={product.id} onClick={() => handleDetail(product.id)} style={{cursor:"pointer"}}>
                                        <Orders  product={product} />
                                    </Col>
                                )).reverse()
                            )
                        }
                    </Row>
                </div>

                {/* Modal Cancel Detail */}
                <Modal style={{marginTop:"200px"}} isOpen={modalCancel} toggle={toggleCancel}>
                    <ModalBody>
                        <p style={{color:"#c70039", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Please Login Or Register</p>
                    </ModalBody>
                </Modal>
        </Fragment>
    )
}

export default  LandingPage;