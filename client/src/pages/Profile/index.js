import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Card, Col, Row, Button, Modal, ModalBody } from 'reactstrap';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';

// component
import Navigation from '../../components/Navigations';
import {AppContext} from "../../context/appContext";
import {API} from "../../config/API";
import Loading from "../../components/Loading";

// images
import Logo from "../../assets/img/logo/Logo.png";
import Avatar from "../../assets/img/avatar/avatarUser.png";
import QrCode from "../../assets/img/qrcode/qr-code.png";
// Styel css
import "./Profile.scss";
import Transactions from '../../components/Home/Transactions';
import Product from '../Product';

const Profile = () => {

    const router = useHistory();

    const [state, dispatch] = useContext(AppContext);

    const [productsItems, setProducts] = useState([]);

    const [transactionItems, setTransaction] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchProducts = async ( ) => {
    
        // const response = await axios.get("http://localhost:5000/api/v1/products")

        const response = await API("/my-transaction");
        if (response.status == 200) {
            setProducts(response.data.data.transaction);
            setLoading(false)
        }

    }


    // useEffect adalah lifecicle untuk stateless component
    useEffect(() => {
        // code untuk menampilkan data dari api
        fetchProducts();
    }, [state])//saat menuliskan dependency [] kosong maka pemanggilan api hanya dilakukan sekali saja


    // ============ approve ===========
    const handleAccepted = (e) => {
        setAcceptedTransaction(e.target.value);
    }
    
    // useEffect adalah lifecicle untuk stateless component
    const setAcceptedTransaction = async ( id ) => {
        try {
            const body = JSON.stringify({ id, status:"Success" });

            const config = {
            headers: {
                "Content-Type": "application/json",
            },
            };

            const response = await API.patch(`/transaction`,body, config);
            
            if (response.status == 200) {
            setTransaction(response.data.data.transactions)
            setLoading(false);
            setModalAccepted(true);
            dispatch({
                type : "USER_LOADED",
                payload : state
            })
            }
            router.push('/profile');
        } catch (err) {
            console.log("Your System Error : ", err);
        }
        
    }
    // ============ approve ===========

        // ================================================================
        // handle Modals
        // ================================================================

        // modal Accepted
        const [modalAccepted, setModalAccepted] = useState(false);    
        const toggleAccepted = () => setModalAccepted(!modalAccepted);
        // modal Accepted

    console.log("product items ",productsItems);
    return loading ? <Loading /> :
    (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Row>
                        <Col md="5">
                            <h3 className="title-profile">My Profile</h3>
                            <Row>
                                <Col md="4">
                                    <img src={Avatar} alt="Profil" className="img-fluid" ></img>
                                </Col>
                                <Col md="8">
                                    <span>
                                        <p className="title-profile">Full Name</p>
                                        <p className="value-profile">{state.fullname}</p>
                                    </span>                                        
                                    <span>
                                        <p className="title-profile">Email</p>
                                        <p className="value-profile">{state.email}</p>
                                    </span>                                        
                                </Col>
                            </Row>
                        </Col>
                        <Col md="7">
                            <h3 className="title-transaction">My Transaction</h3>
                            {
                                productsItems.map(transaction => (
                                    <Card key={transaction.id} className="card-transaction m-2">
                                        <Row className="result-transaction">
                                            <Col md="8">
                                                <Row>
                                                    {

                                                        transaction.products.map(itemProduct => (
                                                            <Transactions key={itemProduct.id} date={transaction.createdAt} product={itemProduct}/>
                                                        ))

                                                    }
                                                </Row>
                                                {
                                                    transaction.status === "On The Way" ? (
                                                        <Button color="warning" className="text-white" size="sm" onClick={handleAccepted} value={transaction.id}>Accepted</Button>
                                                    ) : null
                                                }
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <img src={Logo} alt="Logo" className="mb-4 mx-auto d-block"></img>
                                                <img src={QrCode} alt="qr-code" className="mb-3 mx-auto d-block"></img>
                                                <p className="status-transaction-otw">{transaction.status}</p>
                                                <p className="sub-price-transaction">
                                                    
                                                    <NumberFormat 
                                                        value={transaction.income} 
                                                        displayType={'text'} 
                                                        thousandSeparator={true} 
                                                        prefix={'Sub Total : Rp. '} 
                                                        renderText={
                                                            value => <p className="text-danger"> {value}</p>
                                                        } 
                                                    />
                                                    
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))
                            }
                        </Col>
                    </Row>
                </div>
                {/* ========================== Modal Accepted Transaction =============================== */}
                <Modal isOpen={modalAccepted} toggle={toggleAccepted}>
                <ModalBody>
                    <h3>Transaction Success, Thank You For Order</h3>
                </ModalBody>
                </Modal>
        </Fragment>
    )
}

export default  Profile;