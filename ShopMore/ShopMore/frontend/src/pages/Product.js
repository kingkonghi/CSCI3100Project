// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import { FaMinus, FaPlus, FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";




const Product = () => {

    let {pid} = useParams()
    let navigate = useNavigate();

    const allProductData = [
        [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you could ever found.\nThe manufacturer is origin from England with over 700 years of enterprise and once a producer for the royal family.\n\nOrigin: London, England"],
        [2, "Washing machine", 20, 2000, [["User0445","Been using it for 10 years, perfect."],["Marina C.","Flawless."]], [5.0, 5.0], "Assist with AI production line, a washing machine for life."],
        [3, "Lamp", 20, 100, [["ProCommentor","Nice Lamp!"],["User0002","A little decoration to my pretty room."]], [5.0, 4.5], "Brighten your room with this lamp made with masters based in Germany."]
    ] //id, name, price, stock, reviews (array), rating (array), desc

    let productData = []
    for (let i=0; i<allProductData.length; i++){
        if (allProductData[i][0]==pid){
            productData.push(allProductData[i])
        }
    }
    productData = productData[0]
    const relatedProduct = [[3, "Lamp", "Brighten your room with this lamp made with masters based in Germany."], [2, "Washing machine", "Assist with AI production line, a washing machine for life."]]
    const userName = "User5566"

    function redirect(id){
        navigate('/product/' + id)
    }

    return (
        <>
            <div id="product">
                <table id="productSession">
                    <tr>
                        <td id="imgArea">
                            <img src={"/photo/"+productData[0]+".png"} alt={productData[1]} />
                        </td>
                        <td id="productDesc">
                            <p className="titleBar">{productData[1] + " "}<p id="like"><FaHeart /> You have liked this product!</p></p>
                            <pre>{productData[6] + "\n\n*Remaining stock(s): " + productData[2] +"\n\n*Price: $" + productData[3]}</pre>
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
                            {
                                relatedProduct.map((element, index)=>{
                                    return (
                                        <span>
                                            <td className="productCard">
                                                <img src={"/photo/" + element[0]+".png"} alt={element[1]} /> 
                                                <hr/>
                                                <p className="cardTitle">{element[1]}</p>
                                                <p className="cardInfo">{element[2]}</p>
                                                <button type="button" onClick={()=>redirect(element[0])}>Check it out now!</button>
                                            </td>
                                            <td className="placeholder"></td>
                                        </span>
                                    )
                                })
                            }
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

export default Product;