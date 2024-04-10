// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Orderlist = () => {
  const [orderlist, setOrderlist] = useState([]);

  useEffect(() => {
    const getOrder = async (userID) => {
      try {
        const url = `http://127.0.0.1:8000/order/${userID}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem("token")
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          setOrderlist(data.message); 
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const userID = localStorage.getItem("userid");
    getOrder(userID);
  }, []);

  const updateOrder = (updatedOrder) => {
    setOrderlist(updatedOrder);
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
              {orderlist.length > 0 ? ( // Add conditional check before mapping over orderlist
                orderlist.map((order, index) => (
                  <TRO i={index} key={index} order={order} updateOrder={updateOrder} />
                ))
              ) : (
                <tr>
                  <td colSpan="5">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

class TRO extends React.Component {
  render() {
    const { order } = this.props; // Remove the index from the object destructuring
    const link = '/order/' + order.orderID;
    return (
      <tr>
        <td>{`ORD${order.orderID.toString().padStart(4, '0')}`}</td>
        <td>{order.orderDate}</td>
        <td>{order.orderTotal}</td>
        <td>{order.orderStatus === 0 ? 'Packing' : 'Delivered'}</td>
        <td>
          <Link to={link}>Details</Link>
        </td>
      </tr>
    );
  }
}

export default Orderlist;