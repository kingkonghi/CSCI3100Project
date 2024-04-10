// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss";
import * as React from 'react';
import { useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';

const Order = () => {
  let { oid } = useParams();

  const [orderproduct, setOrderProduct] = useState([
    { pid: 1, name: "lamp", price: 20, quantity: 2 },
    { pid: 2, name: "table", price: 2000, quantity: 1 }
  ]);
  const [discount] = useState(0);
  const [deliveryfee] = useState(50);

  const [email] = useState(localStorage.getItem("email"));
  const [date] = useState("2024-03-30"); //order
  const [status] = useState("Completed"); //order

  const [username] = useState(localStorage.getItem("username"));
  const [contactno] = useState(localStorage.getItem("phoneNo"));
  const [address] = useState(localStorage.getItem("address"));

  // Calculate the total price
  const subtotalPayment = orderproduct.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div id="order">
      <div className="container">
        <div className="row">
          <h4>Your Order ({oid}):</h4>
          <table>
            <thead>
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Price(HK$)</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal(HK$)</th>
              </tr>
            </thead>
            <tbody>
              {orderproduct.map((file, index) => (
                <TRP i={index} key={index} data={orderproduct} />
              ))}
            </tbody>
            <tfoot>
                <tr>
                <td colSpan="4" align="right" style={{ textAlign: "right", paddingRight: "50px" }}>
                Item Subtotal:
                </td>
                <td>{subtotalPayment}</td>
              </tr>
              <tr>
                <td colSpan="4" align="right" style={{ textAlign: "right", paddingRight: "50px" }}>
                Discount:
                </td>
                <td>{discount}</td>
              </tr>
              <tr>
                <td colSpan="4" align="right" style={{ textAlign: "right", paddingRight: "50px" }}>
                Delivery Fee:
                </td>
                <td>{deliveryfee}</td>
              </tr>
              <tr>
                <td colSpan="4" align="right" style={{ textAlign: "right", fontWeight: "bold", paddingRight: "50px" }}>
                Total Payment:
                </td>
                <td>{subtotalPayment-discount+deliveryfee}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="container" style={{marginTop: "20px"}}>
        <div className="row">
            <Row>
                <Col>
                    <h4>Order Detail</h4>
                    <tr>
                        <td>Order ID: </td>
                        <td>{oid}</td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>Order Date: </td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Status: </td>
                        <td>{status}</td>
                    </tr>
                </Col>
                <Col>
                    <h4>Customer Detail</h4>
                    <tr>
                        <td>Name: </td>
                        <td>{username}</td>
                    </tr>
                    <tr>
                        <td>Contact Number: </td>
                        <td>{contactno}</td>
                    </tr>
                    <tr>
                        <td>Address: </td>
                        <td>{address}</td>
                    </tr>
                </Col>
            </Row>
            <Row style={{marginTop: "20px"}}>
                <Col>
                <h4>Payment Detail</h4>
                    <tr>
                        <td>Payment Status: </td>
                        <td>Paid</td>
                    </tr>
                </Col>
            </Row>
        </div>
      </div>   
    </div>
  );
};

export default Order;

class TRP extends React.Component {
  render() {
    let i = this.props.i;
    let link = '/product/' + this.props.data[i].pid;
    return (
      <tr>
        <td><img height="100" src={"/photo/" + this.props.data[i].pid+"_"+this.props.data[i].name + ".png"} /></td>
        <td>
          <Link to={link}> {this.props.data[i].name}</Link>
        </td>
        <td>{this.props.data[i].price}</td>
        <td>{this.props.data[i].quantity}</td>
        <td>{this.props.data[i].price * this.props.data[i].quantity}</td>
      </tr>
    );
  };
}
