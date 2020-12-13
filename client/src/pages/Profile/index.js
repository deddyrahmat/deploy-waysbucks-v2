import React, { Fragment } from 'react'
import { Card, Col, Row } from 'reactstrap';
import Navigation from '../../components/Navigations'

// images
import Logo from "../../assets/img/logo/Logo.png";
import QrCode from "../../assets/img/qrcode/qr-code.png";
// Styel css
import "./Profile.scss";
import Transactions from '../../components/Home/Transactions';

const Profile = () => {
    return (
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
                                        <p className="value-profile">Egi Ganteng</p>
                                    </span>                                        
                                    <span>
                                        <p className="title-profile">Email</p>
                                        <p className="value-profile">egigans@gmail.com</p>
                                    </span>                                        
                                </Col>
                            </Row>
                        </Col>
                        <Col md="7">
                            <h3 className="title-transaction">My Transaction</h3>
                            <Card className="card-transaction">
                                <Row className="result-transaction">
                                    <Col md="8">
                                        <Row>
                                            <Transactions />
                                            <Transactions />
                                        </Row>
                                    </Col>
                                    <Col md="4" className="text-center">
                                        <img src={Logo} alt="Logo" className="mb-4 mx-auto d-block"></img>
                                        <img src={QrCode} alt="qr-code" className="mb-3 mx-auto d-block"></img>
                                        <p className="status-transaction">On The Way</p>
                                        <p className="sub-price-transaction">Sub Total : 69.000</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
        </Fragment>
    )
}

export default  Profile;