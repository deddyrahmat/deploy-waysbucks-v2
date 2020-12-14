// menampilkan seluruh Toping product

import React, { Fragment } from 'react';

// Style Css
import "./ItemToping.scss";

// image icon
// import successIcon from "../../../assets/img/icons/success.png";


const ItemTopings = ({props,toping,handleAddTopings}) => {

  const { id, name,price, imageUrl } = toping;

  return (
    <Fragment>
      {/* <img src={successIcon} alt="success" className="icon-success-toping"></img> */}
      <figure className="figure mt-3 text-center item-toping" onClick={() => handleAddTopings(id)}>
        <img src={imageUrl} alt="toping" className="rounded-circle img-toping"></img>
        <figcaption class="text-center caption-toping">{name}</figcaption>
      </figure>
    </Fragment>
  );
};

export default ItemTopings;