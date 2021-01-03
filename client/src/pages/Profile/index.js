import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Card, Col, Row, Button, Modal, ModalBody, FormGroup, Input } from 'reactstrap';
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
// import Product from '../Product';

const Profile = () => {

    const router = useHistory();

    const [state, dispatch] = useContext(AppContext);

    const [productsItems, setProducts] = useState([]);

    const [transactionItems, setTransaction] = useState([]);

    const [loading, setLoading] = useState(true);

    // avatar profile
    const [image, setImage] = useState({ preview: "", raw: "" });

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

    // ======================================================
  // change avatar
  // ======================================================
    const handleChangeAvatar = async (e) => {
        if (e.target.files.length) {
        setImage({
            preview : URL.createObjectURL(e.target.files[0]),
            raw : e.target.files[0]
        })
        }
    }

    const updateAvatar = async () => {
        try {
            const body = new FormData();
            body.append("photo", image.raw);

            const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
            };
            
            const response = await API.patch("/user", body, config);
            if (response.status == 200) {
                setModalAvatar(true)
                dispatch({
                    type: "USER_LOADED",
                    payload: response.data.data.user
                });
            }
        } catch (err) {
            console.log(" your system error : ",err);
            setModalAvatarFailed(true)
        }
    } 

    useEffect(() => {

        if (image.raw !== '') {
            updateAvatar();            
        }
    }, [image.raw])

        // ================================================================
        // handle Modals
        // ================================================================

        // modal Accepted
        const [modalAccepted, setModalAccepted] = useState(false);    
        const toggleAccepted = () => setModalAccepted(!modalAccepted);
        // modal Accepted

        // modal Avatar
        const [modalAvatar, setModalAvatar] = useState(false);    
        const toggleAvatar = () => setModalAvatar(!modalAvatar);
        // modal Avatar

        // modal AvatarFailed
        const [modalAvatarFailed, setModalAvatarFailed] = useState(false);    
        const toggleAvatarFailed = () => setModalAvatarFailed(!modalAvatarFailed);
        // modal AvatarFailed

    // console.log("product items ",productsItems
    // console.log("product image profil ",image);
    return loading ? <Loading /> :
    (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Row>
                        <Col md="5">
                            <h3 className="title-profile">My Profile</h3>
                            <Row>

                                <Col md="4" >
                                    <label htmlFor="avatar" className="curson-avatar">
                                        {
                                            state.avatar == '' || state.avatar == null ? (
                                                <img src={Avatar} alt="Profil" className="img-fluid" ></img>
                                            ) : (
                                                <img src={state.avatar} alt="Profil" className="img-fluid" ></img>
                                            )
                                        }
                                    </label>
                                    <FormGroup>
                                        <Input type="file" name="avatar" id="avatar" className="d-none" onChange={handleChangeAvatar} />
                                    </FormGroup>
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
                                productsItems.length == 0 ? (
                                    <h5 className="text-danger">Not Found</h5>
                                ) 
                                : (
                                    productsItems.map(transaction => (
                                        <Card key={transaction.id} className="card-transaction m-2">
                                            <Row className="result-transaction">
                                                <Col md="8">
                                                    <Row>
                                                        {

                                                            transaction.products.map(itemProduct => (
                                                                <Transactions key={itemProduct.id} date={transaction.createdAt} product={itemProduct}/>
                                                            )).reverse()

                                                        }
                                                    </Row>
                                                    {
                                                        transaction.status === "On The Way" ? (
                                                            <Button color="warning" className="text-white" size="sm" onClick={handleAccepted} value={transaction.id}>Confirmation Arrival</Button>
                                                        ) : null
                                                    }
                                                </Col>
                                                <Col md="4" className="text-center">
                                                    <img src={Logo} alt="Logo" className="mb-4 mx-auto d-block"></img>
                                                    <img src={QrCode} alt="qr-code" className="mb-3 mx-auto d-block"></img>
                                                    {
                                                        transaction.status == "On The Way" ? (
                                                            <p className="status-transaction-otw">{transaction.status}</p>
                                                        ): transaction.status == "Waiting Approve" ? (
                                                            <p className="status-transaction-wait">{transaction.status}</p>
                                                        ):transaction.status == "Cancel" ? (
                                                            <p className="status-transaction-cancel">{transaction.status}</p>
                                                        ):transaction.status == "Success" ? (
                                                            <p className="status-transaction-success">{transaction.status}</p>
                                                        ):null
                                                    }
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
                                    )).reverse()
                                )
                            }
                        </Col>
                    </Row>
                </div>
                {/* ========================== Modal Accepted Transaction =============================== */}
                <Modal style={{marginTop:"200px"}} isOpen={modalAccepted} toggle={toggleAccepted}>
                    <ModalBody>
                        <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Transaction Success, Thank You For Order</p>
                    </ModalBody>
                </Modal>
                <Modal style={{marginTop:"200px"}} isOpen={modalAvatar} toggle={toggleAvatar}>
                    <ModalBody>
                        <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Change Photo Profil Success</p>
                    </ModalBody>
                </Modal>
                <Modal style={{marginTop:"200px"}} isOpen={modalAvatarFailed} toggle={toggleAvatarFailed}>
                    <ModalBody>
                        <p style={{color:"#c70039", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Change Photo Profil Failed</p>
                    </ModalBody>
                </Modal>
        </Fragment>
    )
}

export default  Profile;