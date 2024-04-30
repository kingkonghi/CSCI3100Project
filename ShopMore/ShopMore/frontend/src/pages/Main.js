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
    const authToken = 'b09782e294306013522c0610bbbe5e601e021b3b' //Admin token to get access
    const userid = localStorage.getItem('userid') //Get user id 
    const accountType = localStorage.getItem('accountType') //Get user type

    let navigate = useNavigate();

    const loadProd = async () => { //Fetch step 1: Get raw product information
        const response = await axios.get( 
            'http://127.0.0.1:8000/product'
        ); 
        setMessage(response.data.item)
        set2(true)
        console.log("product fetch")
    };  

    const loadProd2 = async () => { //Fetch step 2: Get other attribute and consolidation, such as review, campaign, hot sale

        let tempProd = []
        let tempHot = []
        let tempNotHot = []

        const review = await axios.get( //Call backend to get review
        'http://127.0.0.1:8000/review/'
        )

        let tempReview = {}
        for (let i=0;i<review.data.message.length;i++){
            if (review.data.message[i].itemID in tempReview){ //If the product review/rating is already recorded
                let username = ""
                const response = await axios.post('http://127.0.0.1:8000/user/', {userID: review.data.message[i].userID}, { //Call backend to get username from user id
                    headers: {
                        Authorization: 'Token ' + authToken
                    }
                });
                if (response.data.fields.length > 0) {
                    username = response.data.fields[0].username;
                }
                tempReview[review.data.message[i].itemID][0].push([username,review.data.message[i].Review]) //Insert review by name
                tempReview[review.data.message[i].itemID][1].push(review.data.message[i].Rating) //Insert rating
            } else {
                tempReview[review.data.message[i].itemID] = [[],[]] //Initialize the product review/rating array structure
                let username = ""
                const response = await axios.post('http://127.0.0.1:8000/user/', {userID: review.data.message[i].userID}, { //Call backend to get username from user id
                    headers: {
                        Authorization: 'Token ' + authToken
                    }
                });
                if (response.data.fields.length > 0) {
                    username = response.data.fields[0].username;
                }
                tempReview[review.data.message[i].itemID][0].push([username,review.data.message[i].Review]) //Insert review by name
                tempReview[review.data.message[i].itemID][1].push(review.data.message[i].Rating) //Insert rating
            }
        }

        console.log(review)
        
        for (let i=0;i<message.length;i++){ //Get neccessary attributes only for each item
            let temp = []
            temp.push(message[i].itemID)
            temp.push(message[i].itemName)
            temp.push(message[i].itemQuantity)
            temp.push(message[i].itemPrice)
            if (!(message[i].itemID in tempReview)){ //If there is no review for the product, add a temporary "review" stating no one has placed review
                temp.push([["N/A", "no one have commented yet"]])
                temp.push([0])
            } else {
                temp.push(tempReview[message[i].itemID][0])
                temp.push(tempReview[message[i].itemID][1])             
            }
            try{ //Shorten the item description as this is not the product page
                if (message[i].itemDescription.length >= 90){
                    temp.push(message[i].itemDescription.slice(0,90) + "...")
                } else {
                    temp.push(message[i].itemDescription)
                }

            }catch{
                temp.push(message[i].itemDescription)
            }
            temp.push(message[i].itemImage)
            temp.push(message[i].itemCategory)
            try{
                if (message[i].itemCategory.includes("Hot Sales")){ //Hot sales will be displayed on the slideshow
                    tempHot.push(temp)
                } else {
                    tempNotHot.push(temp)
                }
            }catch{
                tempNotHot.push(temp)
            }
            tempProd.push(temp)
            if (tempHot.length===5){ //Hot sales will be displayed on the slideshow, but subject to a maximum of 5 products only
                setProductData(tempProd)
                setHotData(tempHot)
                break;
            }
            if(i===message.length-1){ //If there is not enough hot sales product, randomly fill in the gap to 5 products 
                setProductData(tempProd)
                let lack = 5 - tempHot.length
                for (let y=0;y<lack;y++){
                    tempHot.push(tempNotHot[y])
                }
                setHotData(tempHot)
                set3(true)  
            }
        }
        console.log("review fetched")
    }

    const loadProd3 = async () => {//Fetch step 3: Get recommendation for the user
        const fetchRecommendation = null
        let tempRecommend = []
        let tempRecommendID = []
        try{ //Call backend for the recommendation list for user/admin
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
        catch (err) {//Non-user case
            console.log(accountType)
            tempRecommend = HotData
            tempRecommendID = [0,0,0,0,0,0]
        }
        if (tempRecommendID.length<5){ //At least 5 products should be in the recommendation list, else fill in the gap randomly
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
    },[signal3]); //To ensure the data is loaded in order


      useEffect(() => {
          const interval = setInterval(() => {
                  let newHot = showHot == 4? 0:showHot+1
                  setShowHot(newHot);
              }, 3000);
          
          return () => clearInterval(interval)    
      }, [showHot]); //Allow slideshow of hot product
    
    function redirect(id){
        navigate('/product/' + id)
    } //Allow redirect to product page

    function redirectSearch(name){
        let str = search.join('&&')
        if (search.length == 0){
            str = name + "&&" + lPrice + "-" + hPrice
        } else {
            str = name + "&&" + lPrice + "-" + hPrice + "&&" + str
        }
        navigate('/search/' + str)
    } //Allow redirect to search page

    function modifySearch(types){
        if (types.target.checked){
            console.log(types.target.id)
            search.push(types.target.id)
        } else {
            search.splice(search.indexOf(types.target.id),1)
        }
    } //Real-time update search string that might get passed to search page

    function updatePrice(e){
        if(e[0]==e[1]){
            e[0] = e[0] - 1
        }
        setLPrice(e[0])
        setHPrice(e[1])
    } //Allow real-time update in price, reading from slider

    return (
        <>
        {render?
            <div id="main">
                <table id="hotProduct">
                    <tr>
                        <td id="img">
                            <img src={"/photo/"+HotData[showHot][7]} alt={HotData[showHot][1]} />
                        </td>
                        <td id="productDesc"> {/* Hot sale slideshow */}
                            <h5><FaFireAlt /> Seasonal Trend!</h5>
                            <p className="title">{HotData[showHot][1] + " - $" + HotData[showHot][3]}<span className="star"> {
                                [0,1,2,3,4].map((element)=>{
                                    let rating = HotData[showHot][5].reduce((a, b) => a + b) / Math.max(0.001,HotData[showHot][5].length);
                                    let ratingHolder = null
                                    if(rating>=element+1){ {/* Display rating */}
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
                            <p className="content">Our customers' feedback</p> {/* Display review */}
                            <p className="feedback">{HotData[showHot][4][0][0] + ": " + HotData[showHot][4][0][1]}</p>
                            <p id="displayBlock"> {/* Display the dot indicator of which hot sales product is showing (red=showing) */}
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
                    <div id="searchArea"> {/* For searching (keyword, id, condition) */}
                        <div id="searchGroup"> {/* For textbox searching (keyword, id) */}
                            <input id="searchBoxMain"type="text" placeholder="quote for name or id"/>
                            <FaSearch onClick={()=>redirectSearch(document.getElementById('searchBoxMain').value)}/>
                        </div>
                        <div id="filter"> {/* For condition searching */}
                            <div id="filterTitle1">
                                <h5>Price</h5>
                                <hr/> {/* For price searching */}
                                <Slider className="slider" thumbClassName="priceThumb" trackClassName="priceTrack" value={[lPrice,hPrice]} min={0} max={5000} onChange={(e)=>updatePrice(e)} />       
                                <p id="minRange">$0</p>
                                <p id="maxRange">$5,000</p>
                                <p id="showRange">Selected price range: ${lPrice} - ${hPrice}</p>  
                            </div>
                            <div id="filterTitle2"> {/* For categorial condition searching */}
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
                            <div id="filterTitle3"> {/* For special condition searching */}
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
                    <div id="recommendProduct"> {/* Show recommendation and short description */}
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
                                                <div className="highlightedFeedback"> {/* Show review */}
                                                    <p>{element[4][0][1] + " - "}</p>
                                                    <p className="additionalComment">{element[4][0][0]}</p> {/* Show rating */}
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
                                            </div> {/* Redirect to product page */}
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