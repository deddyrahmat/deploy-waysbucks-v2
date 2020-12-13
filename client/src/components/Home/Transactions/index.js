// menampilkan seluruh product yang akan dijual

import React, { Fragment } from 'react';
import { Col, Card, CardImg, CardImgOverlay, Row } from 'reactstrap';

// Style Css
import "./Transactions.scss";

// Logo Image
import Logo from "../../../assets/img/logo/Logo.png";

const Transactions = (props) => {

  // const { id, name,price, imageUrl } = product;

  return (
    <Fragment>
        <Col md="3">
          <Card inverse className="order-cart-product">
            <CardImg src="https://s3-alpha-sig.figma.com/img/4348/8c71/4273019eb029d3a34583371f7000ecba?Expires=1608508800&Signature=eFCgygKRYRiqs7B-1WEopUGXojT~eIIWtH5ABN~CCJ9NVGR9aEVsxbl6o8PBVKZJZcT1HKg-OpdKxUygb84YdmzJ1R78ilw-q-CsCNbAMRBYovW-CUkJgXY6W~nbQ96EjtelMQjx5J~o1cE90ATZtMPwf4uKKUKN-czusfYOdmxFJRTK6OB4IPKVefS8ALYUN7PGWQjo8QEiaAWUfTfEylpQ2d3lLgY3W4Xm2e6fts8npzzy~P3Dd~HC9rSFCdpVDltR5KmDSEet1qRCjRbv1i-nBAh~9Wi5aYjxRyPDfIA6DE8VhIm0cd8CyBWppkxBCUlmEdWJ8IjuoS6Uq38iqg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Product" className="order-cart-product border-0"  />
            <CardImgOverlay>
              <img src={Logo} alt="Logo Produk" className="order-cart-logo-product"></img>
            </CardImgOverlay>
          </Card>
        </Col>
        <Col md="9">
          <p className="title-product-transaction">Ice Coffe Palm Sugar</p>
          <p className="time-product-transaction">Saturday <span className="date-product-transaction">, 5 March 2020</span></p>
          <p className="toping-product-transaction">Toping <span className="list-toping-product-transaction">: Bill Berry Boba, Bubble Tea Gelatin</span></p>
          <p className="price-product-transaction">Price : Rp.33.000</p>
        </Col>
    </Fragment>
  );
};

export default Transactions;