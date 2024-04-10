// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import "../index.scss"
import * as React from 'react';
import { FaStar, FaRegStar, FaFireAlt, FaSearch } from "react-icons/fa";
import Slider from "react-slider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from 'react';
import { FaRegStarHalfStroke } from "react-icons/fa6";
import axios from "axios";


const Main = () => {

    const [message, setMessage] = useState('');
    const [rating, setRating] = useState('');
    const [showHot, setShowHot] = useState(0);
    const [search, setSearch] = useState([]);
    const [lPrice, setLPrice] = useState(0);
    const [hPrice, setHPrice] = useState(5000);
    const [ProductData, setProductData] = useState([])
    const [HotData, setHotData] = useState([])
    const [render, setRender] = useState(false)
    const [signal2, set2] = useState(false)
    const [signal3, set3] = useState(false)
    const authToken = 'b09782e294306013522c0610bbbe5e601e021b3b'
    const userid = localStorage.getItem('userid')
    const accountType = localStorage.getItem('accountType')

    let navigate = useNavigate();

    const loadProd = async () => { 
        const response = await axios.get( 
            'http://127.0.0.1:8000/product'
        ); 
        setMessage(response.data.item)
        set2(true)
        console.log("product fetch")
    }; 

    const loadProd2 = async () => {

        let tempProd = []
        let tempHot = []
        let tempNotHot = []

        const review = await axios.get( 
        'http://127.0.0.1:8000/review/'
        )

        let tempReview = {}
        for (let i=0;i<review.data.message.length;i++){
            if (review.data.message[i].itemID in tempReview){
                tempReview[review.data.message[i].itemID][0].push([review.data.message[i].userID,review.data.message[i].Review])
                tempReview[review.data.message[i].itemID][1].push(review.data.message[i].Rating)
            } else {
                tempReview[review.data.message[i].itemID] = [[],[]]
                tempReview[review.data.message[i].itemID][0].push([review.data.message[i].userID,review.data.message[i].Review])
                tempReview[review.data.message[i].itemID][1].push(review.data.message[i].Rating)
            }
        }
        
        for (let i=0;i<message.length;i++){
            let temp = []
            temp.push(message[i].itemID)
            temp.push(message[i].itemName)
            temp.push(message[i].itemQuantity)
            temp.push(message[i].itemPrice)
            if (!(message[i].itemID in tempReview)){
                temp.push([["N/A", "no one have commented yet"]])
                temp.push([0])
            } else {
                temp.push(tempReview[message[i].itemID][0])
                temp.push(tempReview[message[i].itemID][1])             
            }
            if (message[i].itemDescription.length >= 90){
                temp.push(message[i].itemDescription.slice(0,90) + "...")
            } else {
                temp.push(message[i].itemDescription)
            }
            temp.push(message[i].itemImage)
            temp.push(message[i].itemCategory)
            if (message[i].itemCategory.includes("Hot Sales")){
                tempHot.push(temp)
            } else {
                tempNotHot.push(temp)
            }
            tempProd.push(temp)
            if (tempHot.length===5){
                setProductData(tempProd)
                setHotData(tempHot)
                break;
            }
            if(i===message.length-1){
                setProductData(tempProd)
                let lack = 5 - tempHot.length
                for (let y=0;y<lack;y++){
                    tempHot.push(tempNotHot[y])
                }
                setHotData(tempHot)
                set3(true)    
                /*setHotData([ //[TBI] Recommendation product
                    [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you..."],
                    [2, "Washing machine", 20, 2000, [["User0445","Been using it for 10 years, perfect."],["Marina C.","Flawless."]], [5.0, 5.0], "Assist with AI production line, a washing machine for life."],
                    [3, "Lamp", 20, 100, [["ProCommentor","Nice Lamp!"],["User0002","A little decoration to my pretty room."]], [5.0, 4.5], "Brighten your room with this lamp made with masters based in Germany."]
                ]) //id, name, price, stock, reviews (array), rating (array), desc*/
            }
        }
        console.log("review fetched")
    }

    const loadProd3 = async () => {
        const fetchRecommendation = null
        let tempRecommend = []
        let tempRecommendID = []
        try{
            fetchRecommendation = await axios.post( 
            'http://127.0.0.1:8000/product/recommendation/',{
                    userID: userid
                }, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                    }
                }
            )
            for (let k=0;k<fetchRecommendation.data["recommended items"].length;k++){
                tempRecommendID.push(fetchRecommendation.data["recommended items"][k].itemID)
            }
        }
        catch (err) {//non-user case
            console.log(accountType)
            tempRecommend = HotData
            tempRecommendID = [0,0,0,0,0,0]
        }
        if (tempRecommendID.length<5){ //At least 5 products 
            let lack = 5 - tempRecommendID.length
            for (let x=0; x<ProductData.length; x++){
                if (!(tempRecommendID.includes(ProductData[x][0])) && lack>0){
                    tempRecommend.push(ProductData[x])
                    lack = lack - 1
                } else if (tempRecommendID.includes(ProductData[x][0])) {
                    tempRecommend.push(ProductData[x])
                }
            }
        }
        setProductData(tempRecommend)
        console.log("recommendation fetched")
        setRender(true)
    }

    useEffect(() => {
        loadProd(); 
    },[]);

    useEffect(() => {
        if(signal2){
            loadProd2();
        }
    },[message]);

    useEffect(() => {
        if(signal3){
            loadProd3(); 
        }
    },[signal3]);


      useEffect(() => {
          const interval = setInterval(() => {
                  let newHot = showHot == 4? 0:showHot+1
                  setShowHot(newHot);
              }, 3000);
          
          return () => clearInterval(interval)    
      }, [showHot]);
    
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

    return (
        <>
        {render?
            <div id="main">
                <table id="hotProduct">
                    <tr>
                        <td id="img">
                            <img src={"/photo/"+HotData[showHot][7]} alt={HotData[showHot][1]} />
                        </td>
                        <td id="productDesc">
                            <h5><FaFireAlt /> Seasonal Trend!</h5>
                            <p className="title">{HotData[showHot][1] + " - $" + HotData[showHot][3]}<span className="star"> {
                                [0,1,2,3,4].map((element)=>{
                                    let rating = HotData[showHot][5].reduce((a, b) => a + b) / Math.max(0.001,HotData[showHot][5].length);
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
                            <input id="searchBoxMain"type="text" placeholder="quote for name or id"/>
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
                                            <input type="checkbox" id="Kitchen" onClick={(e)=>modifySearch(e)} /><p>Kitchen</p>
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
                                            <img src={"/photo/"+element[7]} alt={element[1]} />
                                            <div className="descArea">
                                                <p className="titleBar">{element[1]}</p>
                                                <p>{element[6]}</p>
                                                <div className="highlightedFeedback">
                                                    <p>{element[4][0][1] + " - "}</p>
                                                    <p className="additionalComment">{element[4][0][0]}</p>
                                                    <span className="star">{
                                                        [0,1,2,3,4].map((element2)=>{
                                                            let rating = element[5].reduce((a, b) => a + b) / Math.max(element[5].length,0.001);
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
            </div>:<div>Rendering...</div>
        }
        </>
    );
}

export default Main;