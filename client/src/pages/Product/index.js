// page add product by admin

import React, { Fragment,useState, useContext, useEffect } from 'react'
import { Col, Row } from 'reactstrap';

// component
import FormProduct from '../../components/Home/FormProduct';
import Navigation from '../../components/Navigations';
import {AppContext} from "../../context/appContext";

// style css
import "./Product.scss";

// images
// import IconUpload from "../../assets/img/icons/fileUpload.png";

const Product = () => {

    const [state, dispatch] = useContext(AppContext);

    // ===============================================================
    // fitur upload image dan image preview
    // ===============================================================
    // menampung image yang akan di tampilkan dan disimpan
    const [imagePrev, setImagePrev] = useState({photos : []});
    
        
    useEffect(() => {
        if (state.previewImage && state.previewImage !== null) {            
            setImagePrev({
                // ...prevState,
                photos: [
                    {
                    file: state.previewImage,
                    preview: URL.createObjectURL(state.previewImage)
                    }
                ]
            })
        }
    }, [state.previewImage])
    // ===============================================================
    // fitur upload image dan image preview
    // ===============================================================
    
    return (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Row className="mt-5">
                        <Col md="7">
                            <h3 className="title-page-product">Product</h3>
                            {/* style css ini terletak di compnent navigation landingguest */}

                            {/* form jika beda file */}
                            <FormProduct btn_auth="btn-auth" btn_formAuth="btn-formAuth" title_formAuth="title-formAuth" btn_clickAuth="btn-clickAuth pay-page-product d-block mx-auto"/>
                            {/* form jika beda file */}
                        </Col>
                        <Col md="5" className="text-center">
                            {
                                imagePrev.photos == [] ? (
                                    <div className="add-product-img-container align-center">
                                        <h1 className="">PREVIEW</h1>
                                    </div>
                                ):imagePrev.photos !== [] && imagePrev.photos[0] ? (
                                    <img
                                        src={imagePrev.photos[0].preview}
                                        alt="add-product"
                                        className="img-fluid file-product"
                                    />
                                ):(
                                    <div className="add-product-img-container align-center">
                                        <h4 className="">PREVIEW</h4>
                                    </div>
                                )
                                
                            }
                        </Col>
                    </Row>
                </div>
        </Fragment>
    )
}

export default  Product;