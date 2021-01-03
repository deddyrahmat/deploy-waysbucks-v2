// menampilkan seluruh Toping product

import React, { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';

import { AppContext } from '../../../context/appContext';

// Style Css
import "./ItemToping.scss";

// image icon
// import successIcon from "../../../assets/img/icons/success.png";


const ItemTopings = ({props,toping,handleAddTopings}) => {

  const [state,dispatch] = useContext(AppContext);

  const router = useHistory();

  const { id, name, price, photo } = toping;

  // console.log('did : '+id)

  const handleToping = async (price, id, name) => {     
    // cek inputan user
      let x = document.getElementById(name).checked
      // console.log("x", x)

      // jika user menekan inputan check maka akan menghasilkan nilai true dan a akan menambah data toping
      if(x) {
          // const changeData = topingPrice.concat({id: id, price: price})
          await dispatch({
            type : "ADD_TOPING",
            payload : {id,price, name}
          });
          // return setTopingPrice(...topingPrice, changeData)
          // return setTopingPrice(changeData)
      } else {

        let result = [];
        // jika user menghapus pesanan toping
        // lakukan pencarian toping, cek id dari toping yang dihapus dan hapus dari store
        state.isToping.filter(item => {               
              if (item.id !== id) {
                result = [...result, item];
              }
          })
          await dispatch({
            type : "CANCEL_TOPING",
            payload : result
          });            
      }
  }

  console.log("status ", state);
  return (
    <div className="toping-wrapper">
        <div className="round">
            <label htmlFor={name}>
              <img className="img-toping1" src={photo} alt="toping" />
            </label> 
            <input onChange={() => handleToping(price, id, name)} value={price} type="checkbox" id={name} />
            <label className="label-checkbox" for={name}></label>
        </div>
        <div className="title-toping-wrapper">
            <p className="title-toping">{name}</p>
            <NumberFormat 
                value={price} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'Rp. '} 
                renderText={
                  value => <p className="title-toping mt-n3">{value}</p>
                } />
            
        </div>
    </div>
  );
};

export default ItemTopings;