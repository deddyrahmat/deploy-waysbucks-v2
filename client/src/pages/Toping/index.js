// page add product by admin

import React, { Fragment,useState, useContext, useEffect } from 'react'
import { Col, Row } from 'reactstrap';

// component
import FormToping from '../../components/Home/FormToping';
import Navigation from '../../components/Navigations';
import {AppContext} from "../../context/appContext";

// style css
import "./Toping.scss";

// images
import IconPreview from "../../assets/img/icons/preview.png";


const Toping = () => {

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
                            <h3 className="title-page-product">Toping</h3>
                            {/* style css ini terletak di compnent navigation landingguest */}
                            <FormToping btn_auth="btn-auth" btn_formAuth="btn-formAuth w-100" title_formAuth="title-formAuth" btn_clickAuth="btn-clickAuth pay-page-product d-block mx-auto"/>
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
                                        <img
                                            src={IconPreview}
                                            alt="Preview-product"
                                            className="img-fluid file-product border-preview"
                                        />
                                    </div>
                                )
                                
                            }
                        </Col>
                    </Row>
                </div>
        </Fragment>
    )
}

export default  Toping;