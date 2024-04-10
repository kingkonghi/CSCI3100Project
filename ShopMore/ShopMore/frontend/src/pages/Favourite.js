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
              {favproduct.map((file, index) => (
                <TRF i={index} key={index} data={favproduct} updateFavProduct={updateFavProduct}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Favour;

class TRF extends React.Component {
  deleteRow = () => {
    const { i, data, updateFavProduct } = this.props;
    const updatedFp = [...data];
    updatedFp.splice(i, 1);
    updateFavProduct(updatedFp);
  };

  addToCart = async (userID, itemID) => {
    const url = `http://127.0.0.1:8000/cart/add/${userID}/${itemID}/1`;
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(url, null, { headers });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const i = this.props.i;
    const link = '/product/' + this.props.data[i].pid;
    const userid = localStorage.getItem("userid"); // Replace with the actual user ID
    const itemID = this.props.data[i].pid; // Assuming the product ID is used as the item ID

    return (
      <tr>
        <td><img height="100" src={`/photo/${this.props.data[i].pid}_${this.props.data[i].name}.png`} /></td>
        <td><Link to={link}>{this.props.data[i].name}</Link></td>
        <td>{this.props.data[i].price}</td>
        <td>
          <button 
            type="button"
            className="btn btn-link cart-plus"
            onClick={() => this.addToCart(userid, itemID)}
          >
            <i className="bi bi-cart-plus-fill" style={{ color: 'green' }}></i>
          </button>
        </td>
        <td>
          <button 
            type="button"
            className="btn btn-link x-circle"
            onClick={this.deleteRow}
          >
            <i className="bi bi-x-circle-fill" style={{ color: 'red' }}></i>
          </button>
        </td>
      </tr>
    );
  }
}