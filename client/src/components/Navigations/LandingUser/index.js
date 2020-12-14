// menampilkan navigasi cart dan profil user yang telah login
import React,{Fragment, useContext} from 'react'

import {AppContext} from "../../../context/appContext";

import {  Link, useHistory } from 'react-router-dom';

// API

import { 
    NavItem,
    NavLink, 
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

  // style css
  import "./LandingUser.scss";


// image landing user
import IconCart from "../../../assets/img/icons/iconCart.png";
import AvatarUser from "../../../assets/img/avatar/avatarUser.png";
import IconProfil from "../../../assets/img/icons/profile.png";
import IconLogout from "../../../assets/img/icons/logout.png";

const LandingUser = () => {

    const [state] = useContext(AppContext);

    const router = useHistory();

    const handleLogout = () => {
      router.push("/logout");
    }

    return (
        <Fragment>
            <NavItem className="mt-2">
                <NavLink>
                    <img src={IconCart} alt="Icon Cart" width="30px"></img>
                    <span>{state.carts.length}</span>
                </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar className="mt-2">
              <DropdownToggle nav caret>
                <img src={AvatarUser} alt="Icon Cart" width="30px"></img>
                <span className="mx-2 font-weight-bold">{state.fullname}</span>
              </DropdownToggle>
              <DropdownMenu right className="dropdown-size">
                <DropdownItem className="dropitem-navigation" tag={Link} to="/profile">
                  <img src={IconProfil} alt="Profil" className="img-navigation"></img> <span className="drop-navigation">Profile</span>
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

export default LandingUser;