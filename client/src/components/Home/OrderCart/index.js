// menampilkan seluruh product yang akan dijual

import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardImg, CardImgOverlay, Row } from 'reactstrap';

import { API } from '../../../config/API';

// Style Css
import "./OrderCart.scss";

// Logo Image
import Logo from "../../../assets/img/logo/Logo.png";
import Trash from "../../../assets/img/icons/trash.png";

const OrderCart = ({props, cart}) => {

  const { id, amount, topings } = cart;

  const [itemOrder, setItemOrder] = useState([]);
  const [itemOrderToping, setItemOrderToping] = useState([]);

  const fetchOrderCart = async (id) => {
    const response = await API(`/product/${id}`);
    setItemOrder(response.data.data.product);
  }

  useEffect(() => {
    fetchOrderCart(id);
  },[])

  const fetchOrderCartToping = async (dataId) => {
    const responseToping = await API(`/toping/${dataId}`);
    setItemOrderToping(responseToping.data.data.toping);
  }

  // ==================================
  // ini tidak muncul karna datanya dari fakedataAPI
  // ==================================
  // const arr = [];
  useEffect(() => {


    // =================================
    // fetchOrderCartToping(2);
    // console.log("usee: ",topings);
    Object.keys(topings).map((key, index) => 
      // API(`/toping/${topings[index].id}`)
      // .then((e) => {
      //   setItemOrderToping(e.data.data.toping);
      // })
      // .then(() => {
      //   arr.push(itemOrderToping)
      //   console.log("kedua",arr);
      // })
        fetchOrderCartToping(topings[index].id)
      );
      // topings.map(top => console.log(top))
    },[])
    
    console.log("tes",itemOrderToping);
    

  return (
    <Fragment>
      <Row className="mb-3">
        <Col md="2">
          <Card inverse className="order-cart-product">
            <CardImg src="https://s3-alpha-sig.figma.com/img/4348/8c71/4273019eb029d3a34583371f7000ecba?Expires=1607299200&Signature=MHgd2V8TP9FK0In3Ik199anJJq37eTgSr5W7BrsZ2FB1e5cQuvzH0x85TproA8FPfQI-Jf7~5J1Q-UJCPnuppzSy5WTnkHn4ghB8Cwh-lzvkmlL1YANOxTs33Mqq5CzCAHgBtNEdrNzLdOxfc4QdyzLXTnhVTZkTIaB38XrwwWsMMDij0Y6IWF-RCuNn7CODZI~SX3-uVyjdx~jknE6Ma-ca16xcJ57C5pHbrV5BKz4jWkxMP2u32VUrSnVVDGpG2a2Rw7EC-pFbOX~nu8zQ4lvODW7lo2EkDyE-umnHIRAH2Dumv5XeIFkrxQphl7sKFcooNGrl7jN6DhYpnVWwLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Product" className="order-cart-product border-0"  />
            <CardImgOverlay>
              <img src={Logo} alt="Logo Produk" className="order-cart-logo-product"></img>
            </CardImgOverlay>
          </Card>
        </Col>
        <Col md="7">
          <p className="order-cart-title-product">{itemOrder.name}</p>
          <p className="order-cart-title-product">{amount}</p>
          <p className="order-cart-toping">Toping 
          <span className="order-cart-list-toping">: apa</span>
          {
          itemOrderToping.id
            // topings.map(toping => (
            //   toping.id
            // )
            // )
          }
          
          </p>
        </Col>
        <Col md="3" className="text-right">
          <p className="text-danger"> Rp.33.000</p>
          <img src={Trash} alt="Remove" ></img> 
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderCart;