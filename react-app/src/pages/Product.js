// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import { FaMinus, FaPlus, FaStar, FaRegStar } from "react-icons/fa";




const Search = () => {

    const productData = [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you could ever found.\nThe manufacturer is origin from England with over 700 years of enterprise and once a producer for the royal family.\n\nOrigin: London, England"] //id, name, price, stock, reviews (array), rating (array), desc
    const relatedProduct = [[3, "Lamp", "Brighten your room with this lamp made with masters based in Germany."], [2, "Washing machine", "Assist with AI production line, a washing machine for life."]]
    const userName = "User5566"

    return (
        <>
            <div id="product">
                <table id="productSession">
                    <tr>
                        <td>
                            <img src={"/photo/"+productData[0]+".png"} alt={productData[1]} />
                        </td>
                        <td id="productDesc">
                            <p className="titleBar">{productData[1]}</p>
                            <pre>{productData[6] + "\n\n*Remaining stock(s): " + productData[2]}</pre>
                            <div id="toOrder">
                                <p>Quantity: </p>
                                <FaMinus /><input type="text" placeholder={1}/><FaPlus />
                                <button type="button" className="directButton">Add to shopping cart &rarr;</button>
                            </div>
                        </td>
                    </tr>
                </table>
                <hr/>
                <div id="otherProductSession">
                    <p>You might also found these products interesting...</p>
                    <table>
                        <tr>
                            <td className="productCard">
                                <img src={"/photo/" + relatedProduct[0][0]+".png"} alt={relatedProduct[0][1]} /> 
                                <hr/>
                                <p className="cardTitle">{relatedProduct[0][1]}</p>
                                <p className="cardInfo">{relatedProduct[0][2]}</p>
                                <button type="button">Check it out now!</button>
                            </td>
                            <td className="placeholder"></td>
                            <td className="productCard">
                                <img src={"/photo/" + relatedProduct[1][0]+".png"} alt={relatedProduct[1][1]} /> 
                                <hr/>
                                <p className="cardTitle">{relatedProduct[1][1]}</p>
                                <p className="cardInfo">{relatedProduct[1][2]}</p>
                                <button type="button">Check it out now!</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <hr/>
                <div id="commentSession">
                    <div className="comments">
                        <p className="userName">{productData[4][0][0] + ":"}</p> 
                        <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                        <p className="userComment">{productData[4][0][1]}</p>
                    </div>
                    <div className="comments">
                        <p className="userName">{productData[4][1][0] + ":"}</p> 
                        <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                        <p className="userComment">{productData[4][1][1]}</p>
                    </div>
                </div>
                <hr/>
                <div id="ratingSession">
                    <p>{userName + ", we need your comment!"}</p>
                    <p id="rate">I kinda like this product! <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar /></p>
                    <textarea placeholder="Write down your thought..."></textarea>
                    <button type="button">Send!</button>
                </div>
            </div>
        </>
    );
}

export default Search;