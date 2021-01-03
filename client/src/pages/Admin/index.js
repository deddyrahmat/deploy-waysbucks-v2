import React, { Fragment,useEffect, useState, useContext } from 'react';
import { Container,Col , Row, Button, Modal, ModalBody, Table } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';

// component
// import TableAdmin from '../../components/Home/TableAdmin';
import Navigation from '../../components/Navigations';
import {API} from "../../config/API/index";
import Loading from "../../components/Loading";
import {AppContext} from "../../context/appContext";

// images
import IconSuccess from "../../assets/img/icons/success.png";
import IconCancel from "../../assets/img/icons/cancel.png";
import Send from "../../assets/img/icons/send.png";

// style css
import "./Admin.scss";

const Admin = (props) => {

  const router = useHistory();

    const [transactionItems, setTransaction] = useState([]);

    const [loading, setLoading] = useState(true);

    
  const [state, dispatch] = useContext(AppContext);


  // ========== cancel =============
    const handleCancel = (e) => {
      setCancelTransaction(e.target.value);
    }
    
    // useEffect adalah lifecicle untuk stateless component
    const setCancelTransaction = async ( id ) => {
      
      try {
        const body = JSON.stringify({ id, status:"Cancel" });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await API.patch(`/transaction`,body, config);
        
        if (response.status == 200) {
          const result = response.data.data.transactions;
          setTransaction(result)
          setLoading(false);
          setModalCancel(true);
          // transactions = result;
          dispatch({
            type : "USER_LOADED",
            payload : state
          })
        }
        router.push('/admin');
      } catch (err) {
        console.log("Your System Error : ", err);
      }
      
    }

    // ========== cancel =============


    // ============ approve ===========
    const handleApprove = (e) => {
      setApproveTransaction(e.target.value);
    }
    
    // useEffect adalah lifecicle untuk stateless component
    const setApproveTransaction = async ( id ) => {
      
      try {
        const body = JSON.stringify({ id, status:"On The Way" });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await API.patch(`/transaction`,body, config);
        
        if (response.status == 200) {
          const result = response.data.data.transactions;
          setTransaction(result)
          setLoading(false);
          setModalApprove(true);
          dispatch({
            type : "USER_LOADED",
            payload : state
          })
        }
        router.push('/admin');
      } catch (err) {
        console.log("Your System Error : ", err);
      }
      
    }
    // ============ approve ===========
    
  // ================================================================
  // handle get transaction
  // ================================================================
  const [transactionsItems, setTransactions] = useState([]);

    const fetchTransactions = async ( ) => {
        
        // const response = await axios.get("http://localhost:5000/api/v1/products")

        const response = await API("/transactions");

        if (response.status == 200) {
            setTransactions(response.data.data.transaction);
            setLoading(false)            
        }
    }

    // useEffect adalah lifecicle untuk stateless component
    useEffect(() => {
        // code untuk menampilkan data dari api
        fetchTransactions();
    }, [state])//hanya melakukan pemanggilan saat awal diakses dan ketika ada update di state
    // ================================================================
  // handle get transaction
  // ================================================================
  
  
  
  // ================================================================
  // handle Modals
  // ================================================================

  // modal cancel
  const [modalCancel, setModalCancel] = useState(false);    
  const toggleCancel = () => setModalCancel(!modalCancel);
  // modal cancel

  // modal Approve
  const [modalApprove, setModalApprove] = useState(false);    
  const toggleApprove = () => setModalApprove(!modalApprove);
  // modal Approve

  let no = 1;//no urut untuk tabel


  // console.log("transactions ", transactionsItems);
  return loading ? <Loading /> :
    (
    <Fragment>
      <Navigation />
        <div className="mt-4 container-landing">
          <h2 className="title-admin">Income transaction</h2>
          <Container>
            <Row>
              <Col md="12">

                  {/* <TableAdmin transactions={transactionsItems} /> */}

                  <Table bordered>
                    <thead className="bg-table-admin">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Pos Code</th>
                        <th>Income</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="body-table-admin">
                      {
                        transactionsItems.map(transaction => (
                          <tr key={transaction.id}>
                            <th scope="row">{no++}</th>
                            <td>{transaction.name}</td>
                            <td>{transaction.address}</td>
                            <td>{transaction.posCode}</td>
                            <td className="income-table-admin">
                              <NumberFormat 
                                value={transaction.income} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'Rp. '}  />
                            </td>
                            {
                              transaction.status === "Waiting Approve" ? (
                                <Fragment>
                                  <td className="status-table-admin approve">Waiting Approve</td>
                                  <td align="center">
                                    <Button color="danger" className="btn-cancel btn-table-admin" onClick={handleCancel} value={transaction.id}>Cancel</Button>
                                    <Button color="success" className="btn-approve btn-table-admin" onClick={handleApprove} value={transaction.id}>Approve</Button>
                                  </td>
                                </Fragment>
                              ) : transaction.status === "On The Way" ? (
                                <Fragment>
                                  <td className="status-table-admin otw">On The Way</td>
                                  <td align="center">
                                      <img src={Send} alt="success" ></img>
                                  </td>
                                </Fragment>
                              ) : transaction.status === "Cancel" ? (
                                <Fragment>
                                  <td className="status-table-admin cancel">Cancel</td>
                                  <td align="center">
                                      <img src={IconCancel} alt="cancel" ></img>
                                  </td>
                                </Fragment>
                              ) : transaction.status === "Success" ? (
                                <Fragment>
                                  <td className="status-table-admin success">Success</td>
                                  <td align="center">
                                      <img src={IconSuccess} alt="success" ></img>
                                  </td>
                                </Fragment>
                              ) : null
                            }
                            
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>


              </Col>
            </Row>
          </Container>
        </div>
        {/* ========================== Modal Cancel Transaction =============================== */}
        <Modal style={{marginTop:"200px"}} isOpen={modalCancel} toggle={toggleCancel}>
          <ModalBody>
            <p style={{color:"#c70039", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Cancel Transaction Success</p>
          </ModalBody>
        </Modal>

        {/* ========================== Modal Cancel Transaction =============================== */}
        <Modal style={{marginTop:"200px"}} isOpen={modalApprove} toggle={toggleApprove}>
          <ModalBody>
            <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Approve Transaction Success</p>
          </ModalBody>
        </Modal>
    </Fragment>
  );
}

export default Admin;