// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

const Favour = () => {
    const [favproduct, setFavProduct] = useState([
      { pid: 1, name: "Table", price: 20 },
      { pid: 2, name: "Washing machine", price: 2000 }
    ]);
  
    const updateFavProduct = (updatedFavProduct) => {
      setFavProduct(updatedFavProduct);
    };
  
    return (
    <div id="favour"> 
      <div className="container">
        <div className="row">
          <h4>Your Favourite Product:</h4>
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

      /* addtocart = () => {

      } */
    
      render() {
        let i = this.props.i;
        let link = '/product/' + this.props.data[i].pid;
        return (
          <tr>
            <td><img height="100" src={"/photo/"+this.props.data[i].pid+".png"} /></td>
            <td><Link to={link}> {this.props.data[i].name}</Link></td>
            <td>{this.props.data[i].price}</td>
            <td>
              <button 
                  type="button"
                  className="btn btn-link cart-plus"
                  /*onClick={this.addtocart}*/
                >
                  <i class="bi bi-cart-plus-fill" style={{ color: 'green' }}></i>
              </button>
            </td>
            <td>
              <button 
                  type="button"
                  className="btn btn-link x-circle"
                  onClick={this.deleteRow}
                >
                  <i class="bi bi-x-circle-fill" style={{ color: 'red' }}></i>
              </button>
            </td>
          </tr>
        );
      };
    }