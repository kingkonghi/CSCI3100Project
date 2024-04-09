// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import "../index.scss"
import * as React from 'react';
import { FaStar, FaRegStar, FaFireAlt, FaSearch } from "react-icons/fa";
import Slider from "react-slider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaRegStarHalfStroke } from "react-icons/fa6";
import axios from "axios";


const Main = () => {

    const [message, setMessage] = useState('');
    const [rating, setRating] = useState('');

    let tempData = []

    useEffect(() => {
        const loadProd = async () => { 
            const response = await axios.get( 
                'http://127.0.0.1:8000/product'
            ); 
            setMessage(response.data.item)
    
            for (let i=0;i<message.length;i++){
                axios.get( 
                'http://127.0.0.1:8000/review/' + message[i].itemID
                ).then(value =>{
                        let temp = []
                        temp.push(message[i].itemID)
                        temp.push(message[i].itemName)
                        temp.push(message[i].itemQuantity)
                        temp.push(message[i].itemPrice)
                        //Comment
                        //Rating
                        temp.push(message[i].itemDescription)
                        tempData.push(temp)
                    }
                ).catch(e => {
                    console.log(message[i].itemID)
                    let temp2 = []
                    temp2.push(message[i].itemID)
                    temp2.push(message[i].itemName)
                    temp2.push(message[i].itemQuantity)
                    temp2.push(message[i].itemPrice)
                    temp2.push([])
                    temp2.push([])
                    temp2.push(message[i].itemDescription)
                    tempData.push(temp2)
                })
            }
        }; 
    
        loadProd(); 
        console.log(message)
      },[]);

    const ProductData = [ //[TBI] Recommendation product
        [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you..."],
        [2, "Washing machine", 20, 2000, [["User0445","Been using it for 10 years, perfect."],["Marina C.","Flawless."]], [5.0, 5.0], "Assist with AI production line, a washing machine for life."],
        [3, "Lamp", 20, 100, [["ProCommentor","Nice Lamp!"],["User0002","A little decoration to my pretty room."]], [5.0, 4.5], "Brighten your room with this lamp made with masters based in Germany."]
    ] //id, name, price, stock, reviews (array), rating (array), desc

    const HotData = [ //[TBI] Hot product
        [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you..."],
        [2, "Washing machine", 20, 2000, [["User0445","Been using it for 10 years, perfect."],["Marina C.","Flawless."]], [5.0, 5.0], "Assist with AI production line, a washing machine for life."],
        [3, "Lamp", 20, 100, [["ProCommentor","Nice Lamp!"],["User0002","A little decoration to my pretty room."]], [5.0, 4.5], "Brighten your room with this lamp made with masters based in Germany."]
    ] //id, name, price, stock, reviews (array), rating (array), desc

    let navigate = useNavigate();
    
    const [showHot, setShowHot] = useState(0);
    const [search, setSearch] = useState([]);
    const [lPrice, setLPrice] = useState(0);
    const [hPrice, setHPrice] = useState(5000);
    
    function redirect(id){
        navigate('/product/' + id)
    }

    function redirectSearch(name){
        let str = search.join('&&')
        if (search.length == 0){
            str = name + "&&" + lPrice + "-" + hPrice
        } else {
            str = name + "&&" + lPrice + "-" + hPrice + "&&" + str
        }
        navigate('/search/' + str)
    }

    function modifySearch(types){
        if (types.target.checked){
            console.log(types.target.id)
            search.push(types.target.id)
        } else {
            search.splice(search.indexOf(types.target.id),1)
        }
    }

    function updatePrice(e){
        if(e[0]==e[1]){
            e[0] = e[0] - 1
        }
        setLPrice(e[0])
        setHPrice(e[1])
    }

    useEffect(() => {
        const interval = setInterval(() => {
                let newHot = showHot == 2? 0:showHot+1
                setShowHot(newHot);
            }, 3000);
        
        return () => clearInterval(interval)    
    }, [showHot]);

    return (
        <>
            <div id="main">
                <table id="hotProduct">
                    <tr>
                        <td id="img">
                            <img src={"/photo/"+HotData[showHot][0]+".png"} alt={HotData[showHot][1]} />
                        </td>
                        <td id="productDesc">
                            <h5><FaFireAlt /> Seasonal Trend!</h5>
                            <p className="title">{HotData[showHot][1] + " - $" + HotData[showHot][3]}<span className="star"> {
                                [0,1,2,3,4].map((element)=>{
                                    let rating = HotData[showHot][5].reduce((a, b) => a + b) / HotData[showHot][5].length;
                                    let ratingHolder = null
                                    if(rating>=element+1){
                                        ratingHolder = <FaStar/>
                                    } else {
                                        if(rating >= element+0.5){
                                            ratingHolder = <FaRegStarHalfStroke />
                                        } else {
                                            ratingHolder = <FaRegStar />
                                        }
                                    }
                                    return (ratingHolder)
                                })
                            }</span></p>
                            <p className="content">Our customers' feedback</p>
                            <p className="feedback">{HotData[showHot][4][0][0] + ": " + HotData[showHot][4][0][1]}</p>
                            <p className="feedback">{HotData[showHot][4][1][0] + ": " + HotData[showHot][4][1][1]}</p>
                            <p id="displayBlock">
                                {
                                    [0,1,2,3,4].map((element, index)=>{
                                        let returnDot = null
                                        if(element==showHot){
                                            returnDot = <span className="chosenPoint">&#x2022; </span>
                                        } else {
                                            returnDot = <span className="awaitPoint">&#x2022; </span>
                                        }
                                        return returnDot
                                    })
                                }
                            </p>
                        </td>
                    </tr>
                </table>
                <div id="lowerHalf">
                    <div id="searchArea">
                        <div id="searchGroup">
                            <input id="searchBoxMain"type="text" placeholder="Search..."/>
                            <FaSearch onClick={()=>redirectSearch(document.getElementById('searchBoxMain').value)}/>
                        </div>
                        <div id="filter">
                            <div id="filterTitle1">
                                <h5>Price</h5>
                                <hr/>
                                <Slider className="slider" thumbClassName="priceThumb" trackClassName="priceTrack" value={[lPrice,hPrice]} min={0} max={5000} onChange={(e)=>updatePrice(e)} />       
                                <p id="minRange">$0</p>
                                <p id="maxRange">$5,000</p>
                                <p id="showRange">Selected price range: ${lPrice} - ${hPrice}</p>  
                            </div>
                            <div id="filterTitle2">
                                <h5>Category</h5>
                                <hr/>
                                <table>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Furniture" onClick={(e)=>modifySearch(e)}/><p>Furniture</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Food" onClick={(e)=>modifySearch(e)} /><p>Food</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Male Clothes" onClick={(e)=>modifySearch(e)} /><p>Male Clothes</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Female Clothes" onClick={(e)=>modifySearch(e)} /><p>Female Clothes</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Personal Care" onClick={(e)=>modifySearch(e)} /><p>Personal Care</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Beauty" onClick={(e)=>modifySearch(e)} /><p>Beauty</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="TV & Audio" onClick={(e)=>modifySearch(e)} /><p>TV & Audio</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Kitchen Electronics" onClick={(e)=>modifySearch(e)} /><p>Kitchen Electronics</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Smart Home" onClick={(e)=>modifySearch(e)} /><p>Smart Home</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Other" onClick={(e)=>modifySearch(e)} /><p>Other</p>
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div id="filterTitle3">
                                <h5>Other Attribute</h5>
                                <hr/><table>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Hot Sales" onClick={(e)=>modifySearch(e)} /><p>Hot Sales</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Campaign" onClick={(e)=>modifySearch(e)} /><p>Campaign</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="Fit for you" onClick={(e)=>modifySearch(e)} /><p>Fit for you</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" id="High stock" onClick={(e)=>modifySearch(e)} /><p>High stock</p>
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="recommendProduct">
                        <p id="titleRecommendation">Recommend for you base on your purchase history and favorite item</p>
                        <div id="productGroup">                      
                            {
                                ProductData.map((element, index)=>{
                                    return (
                                        <div className="productDesc">
                                            <img src={"/photo/"+element[0]+".png"} alt={element[1]} />
                                            <div className="descArea">
                                                <p className="titleBar">{element[1]}</p>
                                                <p>{element[6]}</p>
                                                <div className="highlightedFeedback">
                                                    <p>{element[4][0][1] + " - "}</p>
                                                    <p className="additionalComment">{element[4][0][0]}</p>
                                                    <span className="star">{
                                                        [0,1,2,3,4].map((element2)=>{
                                                            let rating = element[5].reduce((a, b) => a + b) / HotData[showHot][5].length;
                                                            let ratingHolder = null
                                                            if(rating>=element2+1){
                                                                ratingHolder = <FaStar/>
                                                            } else {
                                                                if(rating >= element2+0.5){
                                                                    ratingHolder = <FaRegStarHalfStroke />
                                                                } else {
                                                                    ratingHolder = <FaRegStar />
                                                                }
                                                            }
                                                            return (ratingHolder)
                                                        })
                                                    }</span>
                                                </div>
                                                <button type="button" className="directButton" onClick={()=>redirect(element[0])}>Find out more &rarr;</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;