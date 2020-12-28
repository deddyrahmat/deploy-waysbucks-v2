// menampilkan seluruh Toping product

import React, { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";

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

  const [topingPrice, setTopingPrice] = useState([])

  const handleTotal = (price, id, name) => {
    if (state.isLogin) {            
      // cek inputan user
        let x = document.getElementById(name).checked
        // console.log("x", x)

        // jika user menekan inputan check maka akan menghasilkan nilai true dan a akan menambah data toping
        if(x) {
            // const changeData = topingPrice.concat({id: id, price: price})
            dispatch({
              type : "ADD_TOPING",
              payload : id
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
            dispatch({
              type : "CANCEL_TOPING",
              payload : result
            });            
        }
    }else{
        alert('Please Login or Register')
        router.push('/');
    }
  }

  console.log("add toping ", topingPrice);
  return (
    <div className="toping-wrapper">
      <div className="round">
          <label for={name}>
            <img className="img-toping1" src={photo} alt="toping" />
          </label> 
          <input onChange={() => handleTotal(price, id, name)} value={price} type="checkbox" id={name} />
          <label className="label-checkbox" for={name}></label>
      </div>
      <div className="title-toping-wrapper">
          <p className="title-toping">{name}</p>
          <p className="title-toping mt-n3">{price}</p>
      </div>
  </div>
    // <Fragment>
    //   {/* <img src={successIcon} alt="success" className="icon-success-toping"></img> */}
    //   <figure className="figure mt-3 text-center item-toping" onClick={() => handleAddTopings(id)}>
    //     <img src={photo} alt="toping" className="rounded-circle img-toping"></img>
    //     <figcaption className="text-center caption-toping">{name}</figcaption>
    //   </figure>
    // </Fragment>
  );
};

export default ItemTopings;