// menampilkan navigasi cart dan profil user yang telah login
import React,{Fragment} from 'react'
import {  Link, useHistory } from 'react-router-dom';

import { 
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
  DropdownItem
} from 'reactstrap';

  // style css
  import "./LandingAdmin.scss";


// image landing admin
import AvatarUser from "../../../assets/img/avatar/avatarUser.png";
import IconProduct from "../../../assets/img/icons/icon add product.png";
import IconToping from "../../../assets/img/icons/icon add toping.png";
import IconLogout from "../../../assets/img/icons/logout.png";

const LandingAdmin = () => {

    const router = useHistory();

    const handleLogout = () => {
      router.push("/logout");
    }
    return (
        <Fragment>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img src={AvatarUser} alt="Icon Cart" width="40px" className="rounded-circle"></img>
              </DropdownToggle>
              <DropdownMenu right className="dropdown-size">
                <DropdownItem className="dropitem-navigation" tag={Link} to="/product">
                  <img src={IconProduct} alt="Product" className="img-navigation"></img> <span className="drop-navigation">Add Product</span>
                </DropdownItem>
                <DropdownItem className="dropitem-navigation" tag={Link} to="/toping">
                  <img src={IconToping} alt="Toping" className="img-navigation"></img> <span className="drop-navigation">Add Toping</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="dropitem-navigation" onClick={handleLogout}>
                  <img src={IconLogout} alt="Logout" className="img-navigation"></img> <span className="drop-navigation">Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        </Fragment>
    )
}

export default LandingAdmin;