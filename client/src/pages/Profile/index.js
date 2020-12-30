import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Card, Col, Row } from 'reactstrap';
import NumberFormat from 'react-number-format';

// component
import Navigation from '../../components/Navigations';
import {AppContext} from "../../context/appContext";
import {API} from "../../config/API";
import Loading from "../../components/Loading";

// images
import Logo from "../../assets/img/logo/Logo.png";
import QrCode from "../../assets/img/qrcode/qr-code.png";
// Styel css
import "./Profile.scss";
import Transactions from '../../components/Home/Transactions';
import Product from '../Product';

const Profile = () => {

    const [state] = useContext(AppContext);

    const [productsItems, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    // useEffect adalah lifecicle untuk stateless component
    useEffect(() => {
        const fetchProducts = async ( ) => {
        
        // const response = await axios.get("http://localhost:5000/api/v1/products")

        const response = await API("/my-transaction");
        if (response.status == 200) {
            setProducts(response.data.data.transaction);
            setLoading(false)
        }

    }
        // code untuk menampilkan data dari api
        fetchProducts();
    }, [])//saat menuliskan dependency [] kosong maka pemanggilan api hanya dilakukan sekali saja

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
                                    <img src="https://s3-alpha-sig.figma.com/img/5736/4ad6/6ebf751e7f102311d3ba8137ef22382a?Expires=1608508800&Signature=e-Hoo3wv4PK-5O5v8A-RhSSeZneH2AGaPY6om1mtTR-VnIIXLLu8WKzalhjCUgqoqVYV49-tWguNsUMG~mi0DlIaOplLyirT09WoLc4nCLiS3DAYt~8jFyFg7UjzBZeH9haiKAX025WYOeDA7133bjpJmfQdfauGURu6-0Xt-25LH~8w2fszsBi0vH4E~NNashJ90SGgJrbOROtHY69KH2iLX1xxZGkWNhQZNNCWDo3QtsCHAJZm85oMyaLfIr9AH91lURNWzcoP4TSAL9g7NGpSidf8J4IzIJZAtrqAA5J9Mtysb4zKmPmUS6aNPinDqObrBaNLl78AyOPuJv1-sg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Profil" className="img-fluid" ></img>
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
                                    <Card key={transaction.id} className="card-transaction">
                                        <Row className="result-transaction">
                                            <Col md="8">
                                                <Row>
                                                    {

                                                        transaction.products.map(itemProduct => (
                                                            // console.log("tes", itemProduct.product)
                                                            // Object.keys(itemProduct).map(product => (
                                                            //     <Transactions product={itemProduct[product]}/>
                                                            // ))
                                                                <Transactions key={itemProduct.id} date={transaction.createdAt} product={itemProduct}/>
                                                        ))

                                                    }
                                                </Row>
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <img src={Logo} alt="Logo" className="mb-4 mx-auto d-block"></img>
                                                <img src={QrCode} alt="qr-code" className="mb-3 mx-auto d-block"></img>
                                                <p className="status-transaction">On The Way</p>
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
        </Fragment>
    )
}

export default  Profile;