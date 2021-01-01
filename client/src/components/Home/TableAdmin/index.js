import React, {Fragment, useState, useContext} from 'react';
import { Button, Modal, ModalBody, Table } from 'reactstrap';
import NumberFormat from 'react-number-format';
import { useHistory, Link } from 'react-router-dom';

// style css
import "./TableAdmin.scss";

// api
import {API} from "../../../config/API";
import {AppContext} from "../../../context/appContext";

// images
import IconSuccess from "../../../assets/img/icons/success.png";
import IconCancel from "../../../assets/img/icons/cancel.png";
import Send from "../../../assets/img/icons/send.png";

const TableAdmin = ({props,transactions}) => {

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
          setModal(true);
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
      setApproveOffer(e.target.value);
    }
    
    // useEffect adalah lifecicle untuk stateless component
    const setApproveOffer = async ( id ) => {
      
      try {
        const body = JSON.stringify({ id, status:"Send" });

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
          // setModal(false);
        }
        router.push('/admin');
      } catch (err) {
        console.log("Your System Error : ", err);
      }
      
    }
    // ============ approve ===========

    // ================================================================
    // handle offer
    // ================================================================


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    console.log("data transactions",transactionItems);
  return (
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
          transactions.map(transaction => (
            <tr key={transaction.id}>
              <th scope="row">1</th>
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
                ) : transaction.status === "Send" ? (
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

        {/* <tr>
          <th scope="row">1</th>
          <td>Sugeng No Pants</td>
          <td>Cileungsi</td>
          <td>16820</td>
          <td className="income-table-admin">69.000</td>
          <td className="status-table-admin approve">Waiting Approve</td>
          <td align="center">
            <Button color="danger" className="btn-cancel btn-table-admin">Cancel</Button>
            <Button color="success" className="btn-approve btn-table-admin">Approve</Button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Haris Gams</td>
          <td>Serang</td>
          <td>42111</td>
          <td className="income-table-admin">30.000</td>
          <td className="status-table-admin success">Success</td>
          <td align="center">
              <img src={IconSuccess} alt="Success" ></img>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Aziz Union</td>
          <td>Bekasi</td>
          <td>13450</td>
          <td className="income-table-admin">28.000</td>
          <td className="status-table-admin cancel">Cancel</td>
          <td align="center">
              <img src={IconCancel} alt="cancel" ></img>
          </td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Lae Tanjung Balai</td>
          <td>Tanjung Balai</td>
          <td>21331</td>
          <td className="income-table-admin">30.000</td>
          <td className="status-table-admin otw">On The Way</td>
          <td align="center">
              <img src={IconSuccess} alt="success" ></img>
          </td>
        </tr> */}
      </tbody>


      {/* ========================== Modal =============================== */}
      <Modal style={{marginTop:"200px"}} isOpen={modal} toggle={toggle}>
        <ModalBody>
          <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Cancel Transaction Success</p >
        </ModalBody>
      </Modal>
    </Table>
  );
}

export default TableAdmin;