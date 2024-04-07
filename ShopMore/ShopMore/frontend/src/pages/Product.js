// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import { FaMinus, FaPlus, FaStar, FaRegStar, FaHeart, FaRegHeart} from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaRegStarHalfStroke } from "react-icons/fa6";




const Product = () => {

    let {pid} = useParams()
    let navigate = useNavigate();
    const [selfRate, setSelfRate] = useState(5);
    const [selfLove, setSelfLove] = useState(true);

    const allProductData = [ //[TBI] All product
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
    const relatedProduct = [ //[TBI] Related product
        [3, "Lamp", "Brighten your room with this lamp made with masters based in Germany."], 
        [2, "Washing machine", "Assist with AI production line, a washing machine for life."]
    ]
    const userName = "User5566"

    function redirect(id){
        navigate('/product/' + id)
    }
    
    function addNotification(stock){
        if (Number(document.getElementById("priceTag").value) >stock){
            alert("Not enough stock! Please select a valid number.");
        } else if (Number(document.getElementById("priceTag").value) == 0){
            alert("Please enter a valud non-zero number.")
        } else {
            alert("Added to shopping cart")
        }
    }

    function increaseQ(){
        let Quan = document.getElementById("priceTag")
        let temp = Number(Quan.value)
        Quan.value = temp + 1
    }

    function decreaseQ(){
        let Quan = document.getElementById("priceTag")
        let temp = Number(Quan.value)
        Quan.value = Math.max(temp - 1,0)
    }

    function changeRate(e, mouse){
        if (mouse.pageX > mouse.target.getBoundingClientRect().x + mouse.target.getBoundingClientRect().width/2){
            setSelfRate(e + 1)
        } else {
            setSelfRate(e + 0.5)
        }
    }

    function sendingMessage(){
        let message = document.getElementById("userComment")
        message.value = ""
        alert("Comment sent!")
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
                            <p className="titleBar">{productData[1] + " "}<p id="like">{selfLove? <span><FaHeart onClick={()=>setSelfLove(!selfLove)}/> You have liked this product!</span>:<span><FaRegHeart onClick={()=>setSelfLove(!selfLove)}/> This product is not in your favorite list yet...</span>}</p></p>
                            <pre>{productData[6] + "\n\n*Remaining stock(s): " + productData[2] +"\n\n*Price: $" + productData[3]}</pre>
                            <div id="toOrder">
                                <p>Quantity: </p>
                                <FaMinus onClick={()=>decreaseQ()}/><input type="number" id="priceTag" placeholder={0} /><FaPlus onClick={()=>increaseQ()}/>
                                <button type="button" className="directButton" onClick={()=>addNotification(productData[2])}>Add to shopping cart &rarr;</button>
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
                    {
                        productData[4].map((element, index)=>{
                            let rating = productData[5][index]
                            let ratingHolders = [0,1,2,3,4].map((element)=>{
                                let ratingHolder = null
                                if(rating>=element+1){
                                    ratingHolder = <FaStar/>
                                } else {
                                    if(rating == element+0.5){
                                        ratingHolder = <FaRegStarHalfStroke />
                                    } else {
                                        ratingHolder = <FaRegStar />
                                    }
                                }
                                return (ratingHolder)
                            })
                            return (
                                <div className="comments">
                                    <p className="userName">{element[0] + ":"}</p> 
                                    <span className="star">{ratingHolders}</span>
                                    <p className="userComment">{element[1]}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <hr/>
                <div id="ratingSession">
                    <p>{userName + ", we need your comment!"}</p>
                    <p id="rate">
                    {
                        ["I kinda like this product!", "Looks fine to me~", "I am not into this."].map((element, index)=>{
                            if (selfRate>4 && index == 0){
                                return <span>{element}</span>
                            } else if (selfRate>1.5 && selfRate<4.5  && index == 1){
                                return <span>{element}</span>
                            } else if (selfRate<2 && index == 2) {
                                return <span>{element}</span>
                            }
                        })
                    }
                    { 
                        [0,1,2,3,4].map((element)=>{
                            let ratingHolder = null
                            if(selfRate>=element+1){
                                ratingHolder = <FaStar id={element} onClick={(e)=>changeRate(element,e)}/>
                            } else {
                                if(selfRate == element+0.5){
                                    ratingHolder = <FaRegStarHalfStroke id={element} onClick={(e)=>changeRate(element,e)}/>
                                } else {
                                    ratingHolder = <FaRegStar id={element} onClick={(e)=>changeRate(element,e)}/>
                                }
                            }
                            return ratingHolder
                        })
                    }
                    </p>
                    <textarea id="userComment" placeholder="Write down your thought..."></textarea>
                    <button type="button" onClick={()=>sendingMessage()}>Send!</button>
                </div>
            </div>
        </>
    );
}

export default Product;