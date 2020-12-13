import React from 'react';
import { Button, Table } from 'reactstrap';


// style css
import "./TableAdmin.scss";

// images
import IconSuccess from "../../../assets/img/icons/success.png";
import IconCancel from "../../../assets/img/icons/cancel.png";

const TableAdmin = (props) => {
  return (
    <Table bordered>
      <thead className="bg-table-admin">
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Address</th>
          <th>Post Code</th>
          <th>Income</th>
          <th>Status</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody className="body-table-admin">
        <tr>
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
        </tr>
      </tbody>
    </Table>
  );
}

export default TableAdmin;