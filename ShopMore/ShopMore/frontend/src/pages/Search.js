// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import "../index.scss"
import * as React from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from 'react';
import { FaStar, FaRegStar} from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import axios from "axios";



const Search= () => {
    
    let {str} = useParams()
    let navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [returnProductData, setReturnProductData] = useState([])
    const [allProductData, setAllProductData] = useState([])
    const [render, setRender] = useState(false)
    const [signal2, set2] = useState(false)
    const [final, setFinal] = useState("")
    const [filter, setFilter] = useState([])
    const [price, setPrice] = useState([])
    const authToken = 'b09782e294306013522c0610bbbe5e601e021b3b' //Admin token to get access
    const userid = localStorage.getItem('userid') //Get user id 
    const accountType = localStorage.getItem('accountType') //Get user type


    const loadProd = async () => { 
        const response = await axios.get( 
            'http://127.0.0.1:8000/product'
        ); 
        setMessage(response.data.item)
        set2(true)
        console.log("product fetch")
    }; //Fetch Step 1: Get the product information

    const loadProd2 = async () => { //Fetch Step 2: Get the information from the search string and filter the suitable product
        let keyword = str.split("&&")
        let tempName = keyword[0]
        let name = ""
        let id = -1
        let final = -1
        let price = keyword[1].split("-")
        let filter = []
        let fitInd = false
        let highSInd = false
        let camInd = false
        let hotInd = false

        if (tempName.slice(0, 1) == "\"" && tempName.charAt(tempName.length-1) == "\""){ //Identify id or keyword
            name = tempName.slice(1,tempName.length-1)
            console.log(tempName)
        } else {
            id = tempName
        }
        if (id == -1){
            final = name
        } else {
            final = id
        }

        for (let i=2; i<keyword.length; i++){
            filter.push(keyword[i])
        }

        setFinal(final) 
        setFilter(filter) //Set the condition
        setPrice(price) //Set the price range

        let tempRecommendID = []

        if (filter.indexOf("Fit for you")>-1){ //Call backend to get recommendation list (Raw from database) if required (i.e. "fit for you" chosen)
            fitInd = true
            filter.splice(filter.indexOf("Fit for you"), 1)

            const fetchRecommendation = null
    
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
            catch (err) {//Non-user case
                console.log(err)
                fitInd = false
                tempRecommendID = []
            }
        }
        if (filter.indexOf("High stock")>-1){ //Indicate "High stock" is required in the filter
            highSInd = true
            filter.splice(filter.indexOf("High stock"), 1)
        }

        if (filter.indexOf("Campaign")>-1){ //Indicate "Campaign" is required in the filter
            camInd = true
            filter.splice(filter.indexOf("Campaign"), 1)
        }

        if (filter.indexOf("Hot Sales")>-1){ //Indicate "Hot Sales" is required in the filter
            hotInd = true
            filter.splice(filter.indexOf("Hot Sales"), 1)
        }

        let temp2 = []

        for (let i=0;i<Math.min(10,message.length);i++){
            
            let filterPass = true
            let tempFilter = message[i].itemCategory.split(",") //Get product's categories to match with filter
            
            for(let i=0;i<filter.length;i++){
                if(tempFilter.includes(filter[i])){
                    filterPass = true
                    break
                }
                filterPass = false
            } //Match normal category

            if (highSInd){
                if(message[i].itemQuantity<=20){
                    filterPass = false
                }
            } //See if the stock is high enough to meet the "High stock" standard

            if (hotInd){
                if(!(tempFilter.includes("Hot Sales"))){
                    filterPass = false
                }
            } //See if the product have "Hot Sales" tag

            if (camInd){
                if(!tempFilter.includes("Campaign")){
                    filterPass = false
                }
            } //See if the product have "Campaign" tag

            if (fitInd){
                if(!(tempRecommendID.includes(message[i].id))){
                    filterPass = false
                }
                console.log(tempRecommendID)
            } //See if the product is in user's recommendation list
            if (message[i].itemPrice<=price[1] && message[i].itemPrice>=price[0] && ((name==""&&id=="")||((message[i].itemName.includes(name)&&name!="")||message[i].itemID == id)) && filterPass){
                //If product fulfill filter's criteria, extract useful information and display it 
                const review = await axios.get( 
                'http://127.0.0.1:8000/review/' + message[i].itemID
                ) //Call backend to get the review data
                let temp = []
                temp.push(message[i].itemID)
                temp.push(message[i].itemName)
                temp.push(message[i].itemQuantity)
                temp.push(message[i].itemPrice)
                if (review.data.message.length==0){ //If there is no review for the product, add a temporary "review" stating no one has placed review
                    temp.push([["N/A", "no one have commented yet"]])
                    temp.push([0])
                } else {
                    temp.push([])
                    temp.push([])
                    for (let j=0; j<review.data.message.length; j++){
                        let username = ""
                        const response = await axios.post('http://127.0.0.1:8000/user/', {userID: review.data.message[j].userID}, { //Call backend to get the username from user id
                            headers: {
                                Authorization: 'Token ' + authToken
                            }
                        });
                        if (response.data.fields.length > 0) {
                            username = response.data.fields[0].username;
                        }
                        temp[4].push([username,review.data.message[j].Review])
                        temp[5].push([review.data.message[j].Rating])
                    }                
                }
                if (message[i].itemDescription.length >= 90){ //Shorten the item description as this is not the product page
                    temp.push(message[i].itemDescription.slice(0,90) + "...")
                } else {
                    temp.push(message[i].itemDescription)
                }
                temp.push(message[i].itemImage)
                temp2.push(temp)
                setReturnProductData(temp2)
            }
        }
        console.log("search fetched")
        setRender(true)
    }

    useEffect(() => {
        loadProd(); 
    },[]);

    useEffect(() => {
        if(signal2){
            loadProd2();
        }
    },[message]); //Ensure the fetch is done in order

    function redirect(id){
        navigate('/product/' + id)
    } //Allow redirect to product page

    return (
        <>
            {render?
            <div id="search">
                <div id="productGroup"> {/* Show the filter criteria */}
                    <p id="searchTitle"> {returnProductData.length} products matching your filters - </p>
                    {filter.length==0?
                        <p id="searchFilter"> Contain word/id {final} | Price between ${price[0]} and ${price[1]}</p>:  
                        <p id="searchFilter"> Contain word {final} | Price between ${price[0]} and ${price[1]} | Attribute: {filter.join(", ")}</p>   
                    } {/* Show the result or message of no result */}
                    {returnProductData.length != 0? 
                        returnProductData.map((element, index)=>{
                            let content = null
                            if (index==returnProductData.length-1){
                                content = <span></span>
                            } else {
                                content = <hr/>
                            }
                            return( 
                                <div>
                                    <div className="productDesc">
                                        <img src={"/photo/"+element[7]} alt={element[1]} />
                                        <div className="descArea">
                                            <p className="titleBar">{element[1]}</p>
                                            <p>{element[6]}</p>
                                            <div className="highlightedFeedback"> {/* Show review */}
                                                <p>{element[4][0][1] + " - "}</p>
                                                <p className="additionalComment">{element[4][0][0]}</p> {/* Show average rating */}
                                                <span className="star"> {
                                                    [0,1,2,3,4].map((element2)=>{
                                                        let rating = element[5].reduce((a, b) => a + b) / Math.max(0.001,element[5].length);
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
                                            <button type="button" className="directButton" onClick={()=>redirect(element[0])}>Find out more &rarr;</button> {/* Redirect user to product page */}
                                        </div>
                                    </div>
                                    {content} 
                                </div>
                            )
                        }): 
                        <div>No result, please choose a suitable filter and try again. Perhaps you miss the quote for search by name?</div>
                    } {/* Show a hint of no result (e.g. mix up id and keyword search) */}
                </div> 
            </div>:<div>Rendering...</div>
            }
        </>
    );
}

export default Search;