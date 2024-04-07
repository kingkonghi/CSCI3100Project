// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

const Orderlist = () => {
    const [orderlist, setorderlist] = useState([
      { oid: "202403301", date: "2024-03-30", totalprice: 40 , status: "Completed"},
      { oid: "202403311", date: "2024-03-31", totalprice: 2000 , status: "Delivering"},
      { oid: "202403312", date: "2024-03-31", totalprice: 2020 , status: "Packing"}
    ]);
  
    const updateOrder = (updatedOrder) => {
      setorderlist(updatedOrder);
    };
  
    return (
    <div id="orderlist"> 
      <div className="container">
        <div className="row">
          <h4>Your Order:</h4>
          <table>
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Order Date</th>
                <th scope="col">Total Price(HK$)</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {orderlist.map((file, index) => (
                <TRO i={index} key={index} data={orderlist} updateOrder={updateOrder}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  };

export default Orderlist;

    class TRO extends React.Component {
    
      render() {
        let i = this.props.i;
        let link = '/order/' + this.props.data[i].oid;
        return (
          <tr>
            <td>{this.props.data[i].oid}</td>
            <td>{this.props.data[i].date}</td>
            <td>{this.props.data[i].totalprice}</td>
            <td>{this.props.data[i].status}</td>
            <td>
                <Link to={link}> Details </Link>
            </td>
          </tr>
        );
      };
    }