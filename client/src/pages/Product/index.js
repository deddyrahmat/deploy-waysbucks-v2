// page add product by admin

import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap';
import FormProduct from '../../components/Home/FormProduct';
import Navigation from '../../components/Navigations'

// style css
import "./Product.scss";


const Product = () => {
    return (
        <Fragment>
            <Navigation />
                <div className="mt-4 container-landing">
                    <Row className="mt-5">
                        <Col md="7">
                            <h3 className="title-page-product">Product</h3>
                            {/* style css ini terletak di compnent navigation landingguest */}
                            <FormProduct btn_auth="btn-auth" btn_formAuth="btn-formAuth" title_formAuth="title-formAuth" btn_clickAuth="btn-clickAuth pay-page-product d-block mx-auto"/>
                        </Col>
                        <Col md="5">
                            <img src="https://s3-alpha-sig.figma.com/img/4348/8c71/4273019eb029d3a34583371f7000ecba?Expires=1608508800&Signature=eFCgygKRYRiqs7B-1WEopUGXojT~eIIWtH5ABN~CCJ9NVGR9aEVsxbl6o8PBVKZJZcT1HKg-OpdKxUygb84YdmzJ1R78ilw-q-CsCNbAMRBYovW-CUkJgXY6W~nbQ96EjtelMQjx5J~o1cE90ATZtMPwf4uKKUKN-czusfYOdmxFJRTK6OB4IPKVefS8ALYUN7PGWQjo8QEiaAWUfTfEylpQ2d3lLgY3W4Xm2e6fts8npzzy~P3Dd~HC9rSFCdpVDltR5KmDSEet1qRCjRbv1i-nBAh~9Wi5aYjxRyPDfIA6DE8VhIm0cd8CyBWppkxBCUlmEdWJ8IjuoS6Uq38iqg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="File Product" className="img-fluid file-product" ></img>
                        </Col>
                    </Row>
                </div>
        </Fragment>
    )
}

export default  Product;