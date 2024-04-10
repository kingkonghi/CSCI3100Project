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
    const authToken = 'b09782e294306013522c0610bbbe5e601e021b3b'
    const userid = localStorage.getItem('userid')
    const accountType = localStorage.getItem('accountType')


    const loadProd = async () => { 
        const response = await axios.get( 
            'http://127.0.0.1:8000/product'
        ); 
        setMessage(response.data.item)
        set2(true)
        console.log("product fetch")
    }; 

    const loadProd2 = async () => {
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

        if (tempName.slice(0, 1) == "\"" && tempName.charAt(tempName.length-1) == "\""){
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
        setFilter(filter)
        setPrice(price)

        let tempRecommendID = []

        if (filter.indexOf("Fit for you")>-1){
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
            catch (err) {//non-user case
                fitInd = false
                tempRecommendID = []
            }
        }

        if (filter.indexOf("High stock")>-1){
            highSInd = true
            filter.splice(filter.indexOf("High stock"), 1)
        }

        if (filter.indexOf("Campaign")>-1){
            camInd = true
            filter.splice(filter.indexOf("Campaign"), 1)
        }

        if (filter.indexOf("Hot Sales")>-1){
            hotInd = true
            filter.splice(filter.indexOf("Hot Sales"), 1)
        }

        let temp2 = []

        for (let i=0;i<Math.min(10,message.length);i++){
            
            let filterPass = true
            let tempFilter = message[i].itemCategory.split(",")
            
            for(let i=0;i<filter.length;i++){
                if(tempFilter.includes(filter[i])){
                    filterPass = true
                    break
                }
                filterPass = false
            }

            if (highSInd){
                if(message[i].itemQuantity<=20){
                    filterPass = false
                }
            }

            if (hotInd){
                if(!("Hot Sales" in tempFilter)){
                    filterPass = false
                }
            }

            if (camInd){
                if(!("Campaign") in tempFilter){
                    filterPass = false
                }
            }

            if (fitInd){
                if(!(message[i].id in tempRecommendID)){
                    filterPass = false
                }
            }
            console.log(name)
            if (message[i].itemPrice<=price[1] && message[i].itemPrice>=price[0] && ((name==""&&id=="")||((message[i].itemName.includes(name)&&name!="")||message[i].itemID == id)) && filterPass){
                const review = await axios.get( 
                'http://127.0.0.1:8000/review/' + message[i].itemID
                )
                let temp = []
                temp.push(message[i].itemID)
                temp.push(message[i].itemName)
                temp.push(message[i].itemQuantity)
                temp.push(message[i].itemPrice)
                if (review.data.message.length==0){
                    temp.push([["N/A", "no one have commented yet"]])
                    temp.push([0])
                } else {
                    temp.push([])
                    temp.push([])
                    for (let j=0; j<review.data.message.length; j++){
                        let username = ""
                        const response = await axios.post('http://127.0.0.1:8000/user/', {userID: review.data.message[j].userID}, {
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
                if (message[i].itemDescription.length >= 90){
                    temp.push(message[i].itemDescription.slice(0,90) + "...")
                } else {
                    temp.push(message[i].itemDescription)
                }
                temp.push(message[i].itemImage)
                temp2.push(temp)
                setReturnProductData(temp2) //id, name, price, stock, reviews (array), rating (array), desc
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
    },[message]);

    function redirect(id){
        navigate('/product/' + id)
    }

    return (
        <>
            {render?
            <div id="search">
                <div id="productGroup">
                    <p id="searchTitle"> {returnProductData.length} products matching your filters - </p>
                    {filter.length==0?
                        <p id="searchFilter"> Contain word/id {final} | Price between ${price[0]} and ${price[1]}</p>:  
                        <p id="searchFilter"> Contain word {final} | Price between ${price[0]} and ${price[1]} | Attribute: {filter.join(", ")}</p>   
                    }
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
                                            <div className="highlightedFeedback">
                                                <p>{element[4][0][1] + " - "}</p>
                                                <p className="additionalComment">{element[4][0][0]}</p>
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
                                            <button type="button" className="directButton" onClick={()=>redirect(element[0])}>Find out more &rarr;</button>
                                        </div>
                                    </div>
                                    {content} 
                                </div>
                            )
                        }):
                        <div>No result, please choose a suitable filter and try again. Perhaps you miss the quote for search by name?</div>
                    }
                </div> 
            </div>:<div>Rendering...</div>
            }
        </>
    );
}

export default Search;