// menampilkan seluruh product yang akan dijual

import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { Card, CardImg, CardImgOverlay } from 'reactstrap';

// Style Css
import "./Orders.scss";

// Logo Image
import Logo from "../../../assets/img/logo/Logo.png";

const Orders = ({props,product}) => {

  const { name,price, imageUrl } = product;//id belum

  return (
    <Fragment>
        <Card inverse className="Product">
          <CardImg width="100%" src={imageUrl} alt="Logo Product" className="img-fluid back-img" />
          <CardImgOverlay>
            <img src={Logo} alt="Logo Produk" className="img-fluid logo-product"></img>
          </CardImgOverlay>
          <div className="card-body text-danger">
            <p className="paragraf-product"> {name} </p>
            <NumberFormat 
              value={price} 
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'Rp. '} 
              renderText={
                value => <small className="price-product">{value}</small>
              } />

            
          </div>
        </Card>
    </Fragment>
  );
};

export default Orders;