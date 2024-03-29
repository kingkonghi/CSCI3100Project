// Student Name : Chu Tsz Chim James, Chow Ka Shing, Fong Kwai Yiu, Lee Ho Kan
// Student ID : 1155142348, 1155160080, 1155160139, 1155157376

import "../index.scss"
import * as React from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";




const Search = () => {

    const productData = [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you could ever found. The manufacturer is origin from England with over 700 years of enterprise and once a producer for the royal family."] //id, name, price, stock, reviews (array), rating (array), desc


    return (
        <>
            <div id="product">
                <table id="productSession">
                    <tr>
                        <td>
                            <img src={"/photo/"+productData[1]+".png"} alt={productData[1]} />
                        </td>
                        <td id="productDesc">
                            <p className="titleBar">{productData[1]}</p>
                            <p>{productData[6]}</p>
                            <p>Quantity: </p>
                            <div id="toOrder">
                                <FaMinus /><input type="text"/><FaPlus />
                                <button type="button" className="directButton">Add to shopping cart &rarr;</button>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="commentSession">

                </div>
                <div id="ratingSession">

                </div>
            </div>
        </>
    );
}

export default Search;