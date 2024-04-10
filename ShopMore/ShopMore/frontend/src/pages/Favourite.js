// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Favour = () => {
  const [favproduct, setFavProduct] = useState([]);

  useEffect(() => {
    const fetchFavoriteList = async () => {
      const url = 'http://127.0.0.1:8000/display_favorite/';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem("token")
      };

      try {
        const response = await axios.get(url, { headers });
        const favoriteList = response.data;
        console.log(favoriteList)
        setFavProduct(favoriteList);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFavoriteList();
  }, []);

  const updateFavProduct = (updatedFavProduct) => {
    setFavProduct(updatedFavProduct);
  };

  return (
    <div id="favour"> 
      <div className="container">
        <div className="row">
          <h4>Your Favorite Product:</h4>
          <table>
            <thead>
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Price(HK$)</th>
                <th scope="col">Add to Cart</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {favproduct.length > 0 ? ( // Add conditional check before mapping over orderlist
                favproduct.map((file, index) => (
                  <TRF i={index} key={index} data={favproduct} updateFavProduct={updateFavProduct}/>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No favourite products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Favour;

const deleteFavorite = async (itemID) => {
  const url = `http://127.0.0.1:8000/delete_favorite/${itemID}`;  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem("token")
  };

  try {
    const response = await axios.delete(url, { headers });
    alert("Product removed.")
  } catch (error) {
    console.error('Error:', error);
  }
};

class TRF extends React.Component {
  deleteRow = (itemID) => {
    const { i, data, updateFavProduct } = this.props;
    const updatedFp = [...data];
    updatedFp.splice(i, 1);
    updateFavProduct(updatedFp);
    deleteFavorite(itemID);
  };

  addToCart = async (userID, itemID, quantity) => {
    const url = `http://127.0.0.1:8000/cart/add/${userID}/${itemID}/${quantity}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const i = this.props.i;
    const link = '/product/' + this.props.data[i].itemid;
    const userid = localStorage.getItem("userid");
    const itemID = this.props.data[i].itemid;

    return (
      <tr>
        <td><img height="100" src={`/photo/${this.props.data[i].itemImage}`} /></td>
        <td><Link to={link}>{this.props.data[i].itemName}</Link></td>
        <td>{this.props.data[i].itemPrice}</td>
        <td>
          <button
            type="button"
            className="btn btn-link cart-plus"
            onClick={() => this.addToCart(userid, itemID, 1)}
          >
            <i className="bi bi-cart-plus-fill" style={{ color: 'green' }}></i>
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-link x-circle"
            onClick={() => this.deleteRow(itemID)}
          >
            <i className="bi bi-x-circle-fill" style={{ color: 'red' }}></i>
          </button>
        </td>
      </tr>
    );
  }
}