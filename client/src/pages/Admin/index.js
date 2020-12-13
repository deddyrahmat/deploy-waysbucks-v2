import React, {Fragment} from 'react';
import { Container,Col , Row } from 'reactstrap';
import TableAdmin from '../../components/Home/TableAdmin';
import Navigation from '../../components/Navigations';

// style css
import "./Admin.scss";

const Admin = (props) => {
  return (
    <Fragment>
      <Navigation />
        <div className="mt-4 container-landing">
          <h2 className="title-admin">Income transaction</h2>
          <Container>
            <Row>
              <Col>
                    <TableAdmin />
              </Col>
            </Row>
          </Container>
        </div>
    </Fragment>
  );
}

export default Admin;