// menampilkan seluruh product yang akan dijual

import React, { Fragment,useEffect, useState, useContext } from 'react';
import { Col, Card, CardImg, CardImgOverlay, Row } from 'reactstrap';
import NumberFormat from 'react-number-format';

// component
import {AppContext} from "../../../context/appContext";

// Style Css
import "./Transactions.scss";

// Logo Image
import Logo from "../../../assets/img/logo/Logo.png";

const Transactions = ({props, date, product}) => {

  const [state, dispatch] = useContext(AppContext);

  const { id, name,price, photo } = product.product;

  const [nameToping, setNameToping] = useState([]);

  const [subTotal, setSubTotal] = useState([]);
  
  // ==============================================
  // handle name toping
  // ==============================================

  let topingtemp = [];
  
  useEffect(() => {
    setNameToping(topingtemp)
  }, [])
  // ==============================================
  // handle name toping
  // ==============================================


// ==============================================
// handle price product
// ==============================================
let totaltemp = [];

useEffect(() => {
  let sum = totaltemp.reduce((a,b) => a + b, 0)
  let sumTotal = price + sum
  
  if (!isNaN(sumTotal)) {
    setSubTotal(sumTotal);
  }
  
}, [])
// ==============================================
// handle price product
// ==============================================

  return (
    <Fragment>
        <Col md="3">
          <Card inverse className="order-cart-product">
            <CardImg src={photo} alt="Product" className="order-cart-product border-0"  />
            {/* <CardImgOverlay>
              <img src={Logo} alt="Logo Produk" className="order-cart-logo-product"></img>
            </CardImgOverlay> */}
          </Card>
        </Col>
        <Col md="9">
          <p className="title-product-transaction">{name}</p>
          <p className="time-product-transaction">Saturday <span className="date-product-transaction">, {new Date(date).toLocaleDateString()}</span></p>
          <p className="toping-product-transaction">Toping <span className="list-toping-product-transaction">: 
            {nameToping.join(', ')}
            {
              product.topings.map(toping => {
                totaltemp = [...totaltemp ,toping.toping.price];
                topingtemp = [...topingtemp, toping.toping.name];
              })
            }
          </span></p>

            {
              subTotal > 0 && (
                <NumberFormat 
                value={subTotal} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'Price : Rp. '} 
                renderText={
                  value => <p className="price-product-transaction"> {value}</p>
                } />
              )
            }
        </Col>
    </Fragment>
  );
};

export default Transactions;