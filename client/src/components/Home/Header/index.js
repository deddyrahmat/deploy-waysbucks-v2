// menjadi component header(menampilkan image di jumbotron)

import React, { Fragment } from 'react'

// import header image
import ImageHeader from "../../../assets/img/Header.svg";

const Header = () => {
    return (
        <Fragment>
            <img src={ImageHeader} alt="Header" className="img-fluid"></img>
        </Fragment>
    )
}

export default Header;