// menampilkan seluruh Toping product

import React, { Fragment } from 'react';

// Style Css
import "./ItemToping.scss";


const ItemTopings = ({props,toping}) => {

  const { id, name,price, imageUrl } = toping;

  return (
    <Fragment>
      <figure className="figure mt-3 text-center">
        <img src={imageUrl} alt="toping" className="rounded-circle img-toping"></img>
        <figcaption class="text-center caption-toping">{name}</figcaption>
      </figure>
    </Fragment>
  );
};

export default ItemTopings;