// menampilkan seluruh product yang akan dijual

import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardImg, CardImgOverlay, Row } from 'reactstrap';
import NumberFormat from 'react-number-format';

import { API } from '../../../config/API';
import {AppContext} from "../../../context/appContext";
// Style Css
import "./OrderCart.scss";

// Logo Image
import Logo from "../../../assets/img/logo/Logo.png";
import Trash from "../../../assets/img/icons/trash.png";

const OrderCart = ({props, cart}) => {

  const { id, amount, topings } = cart;

  const [state, dispatch] = useContext(AppContext);

  const [itemOrder, setItemOrder] = useState([]);//data product

  // const [itemOrderToping, setItemOrderToping] = useState([]);

  const [total, setTotal] = useState(0);
  
  const [subTotal, setSubTotal] = useState([]);
  // =======================================================
  // product
  // =======================================================
  const fetchOrderCart = async (id) => {
    const response = await API(`/product/${id}`);
    setItemOrder(response.data.data.product);
  }
  
  useEffect(() => {
    fetchOrderCart(id);
  },[])
  // =======================================================
  // product
  // =======================================================
  
  // Data Toping
  // useEffect(() => {
  //   state.carts.map(cart => 
  //     itemOrder.id == cart.id && (
  //       Object.keys(cart.topings).length > 0 && (

  //         Object.keys(cart.topings).map((index) => 
  //           setItemOrderToping(cart.topings[index])
  //           // <span className="order-cart-list-toping"> {(cart.topings[index].name)}</span>
  //         )
  //       )
  //     )
  //   )
  // }, [itemOrder])


  // console.log("data toping", itemOrderToping);

  // =======================================================
  // SubTotal
  // =======================================================
  // useEffect(() => {
  //   state.carts.map(cart => {
  //       if (itemOrder.id == cart.id) {
  //         if (Object.keys(cart.topings).length > 0) {
  //           Object.keys(cart.topings).map((index) => {
  //             let priceList = parseInt(cart.topings[index].price)
  //             // const total = Object.values(add).reduce((t, n) => t + n)
  //             // const total = Object.values(priceList).reduce((t, n) => t + n)
  //               let sum = Object.values(priceList).reduce((t, n) => t + n)
  //               let sumTotal = itemOrder.price + sum
  //               setTotal(sumTotal)
  //             }
  //             // <span className="order-cart-list-toping"> {(cart.topings[index].name)}</span>
  //           )
  //         }
  //       }
  //     }
  //   )
  // }, [itemOrder.id])
  // =======================================================
  // SubTotal
  // =======================================================


  let totaltemp = [];
  useEffect(() => {
    console.log("total temp atas",totaltemp);
    // let priceList = state.isToping.map((prices) => parseInt(prices.price))
    let sum = totaltemp.reduce((a,b) => a + b, 0)
    let sumTotal = itemOrder.price + sum
    setTotal(sumTotal);
    
  }, [itemOrder.price])

  // let totalSubOrder = [];
  useEffect(() => {
    console.log("total temp totalSubOrder",totaltemp);
    // let priceList = state.isToping.map((prices) => parseInt(prices.price))
    let sum = totaltemp.reduce((a,b) => a + b, 0)
    let sumTotal = itemOrder.price + sum

    if (!isNaN(sumTotal)) {
      console.log("dsipat",sumTotal);
      dispatch({
        type : "SUB_TOTAL",
        payload : sumTotal
      });
    }
    // setSubTotal([...subTotal,sumTotal]);
    
  }, [itemOrder.price])

  // const nilai = [];
  // useEffect(() => {
    
  //   if (total > 0 && typeof(total) == Number) {
  //     console.log("muncul gak?");
  //     // nilai = ;
  //     setSubTotal([...subTotal,total]);
  //   }
  // }, [total,subTotal])

  // useEffect(() => {
  //   dispatch({
  //     type: "GET_TOTAL_CART",
  //   });
  // }, [dispatch]);
    
    console.log("type total",typeof(total));
    console.log("total",total);
    console.log("tes",state);
    // console.log("sub total ",subTotal);
    

  return (
    <Fragment>
      <Row className="mb-3">
        <Col md="2">
          <Card inverse className="order-cart-product">
            <CardImg src={itemOrder.photo} alt="Product" className="order-cart-product border-0"  />
            <CardImgOverlay>
              <img src={Logo} alt="Logo Produk" className="order-cart-logo-product"></img>
            </CardImgOverlay>
          </Card>
        </Col>
        <Col md="7">
          <p className="order-cart-title-product">{itemOrder.name}</p>
          <p className="order-cart-title-product">{amount}</p>
          <p className="order-cart-toping">Toping :
          {/* <span className="order-cart-list-toping">: apa</span> */}
          {
            state.carts.map(cart => 
              itemOrder.id == cart.id && (
                Object.keys(cart.topings).length > 0 && (

                  Object.keys(cart.topings).map((index) => 
                    <span className="order-cart-list-toping"> {(cart.topings[index].name)}</span>
                  )
                )
              )
            )
          }
          
          </p>
        </Col>
        <Col md="3" className="text-right">
          {
            state.carts.map(cart => 
              itemOrder.id == cart.id && (
                Object.keys(cart.topings).length > 0 && (

                  // ==============================================not function
                  // cart.topings.reduce((acc, obj) => acc + obj.score, 0)
                  // cart.topings.reduce(function(accumulator, currentValue) {
                  //   return accumulator + currentValue.age;
                  // }, 0)
                  // ==============================================not function

                  Object.keys(cart.topings).map((index) => 
                    {
                      totaltemp = [...totaltemp ,cart.topings[index].price];
                      console.log("total temp",totaltemp);
                    }
                  )
                )
              )
            )
          }
          <NumberFormat 
              value={total} 
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'Rp. '} 
              renderText={
                value => <p className="text-danger"> {value}</p>
              } />
          <img src={Trash} alt="Remove" ></img> 
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderCart;