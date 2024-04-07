// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import "../index.scss"
import * as React from 'react';
import { FaFireAlt, FaSearch } from "react-icons/fa";
import Slider from "react-slider";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";



const Search= () => {
    
    let {str} = useParams()
    let navigate = useNavigate();
    let keyword = str.split("&&")

    let name = keyword[0]
    let price = keyword[1].split("-")
    let filter = []
    for (let i=2; i<keyword.length; i++){
        filter.push(keyword[i])
    }

    const allProductData = [ //[TBI] All product
        [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you..."],
        [2, "Washing machine", 20, 2000, [["User0445","Been using it for 10 years, perfect."],["Marina C.","Flawless."]], [5.0, 5.0], "Assist with AI production line, a washing machine for life."],
        [3, "Lamp", 20, 100, [["ProCommentor","Nice Lamp!"],["User0002","A little decoration to my pretty room."]], [5.0, 4.5], "Brighten your room with this lamp made with masters based in Germany."]
    ] //id, name, price, stock, reviews (array), rating (array), desc

    let returnProductData = [] //id, name, price, stock, reviews (array), rating (array), desc

    for (let i=0; i<allProductData.length; i++){
        if (allProductData[i][3]<=price[1] && allProductData[i][3]>=price[0] && allProductData[i][1].includes(name)){
            returnProductData.push(allProductData[i])
        }
    }

    function redirect(id){
        navigate('/product/' + id)
    }

    return (
        <>
            <div id="search">
                <div id="productGroup">
                    <p id="searchTitle"> {returnProductData.length} products matching your filters - </p>
                    {filter.length==0?
                        <p id="searchFilter"> Contain word "{name}" | Price between ${price[0]} and ${price[1]}</p>:  
                        <p id="searchFilter"> Contain word "{name}" | Price between ${price[0]} and ${price[1]} | Attribute: {filter.join(", ")}</p>   
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
                                        <img src={"/photo/"+element[0]+".png"} alt={element[1]} />
                                        <div className="descArea">
                                            <p className="titleBar">{element[1]}</p>
                                            <p>{element[6]}</p>
                                            <div className="highlightedFeedback">
                                                <p>{element[4][0][1] + " - "}</p>
                                                <p className="additionalComment">{element[4][0][0]}</p>
                                                <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                                            </div>
                                            <button type="button" className="directButton" onClick={()=>redirect(element[0])}>Find out more &rarr;</button>
                                        </div>
                                    </div>
                                    {content} 
                                </div>
                            )
                        }):
                        <div>No result, please choose a suitable filter and try again.</div>
                    }
                </div> 
            </div>
        </>
    );
}

export default Search;