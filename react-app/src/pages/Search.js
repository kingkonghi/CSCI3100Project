// Student Name : Chu Tsz Chim James, Chow Ka Shing, Fong Kwai Yiu, Lee Ho Kan
// Student ID : 1155142348, 1155160080, 1155160139, 1155157376

import "../index.scss"
import * as React from 'react';
import { FaFireAlt, FaSearch } from "react-icons/fa";
import Slider from "react-slider";



const Search = () => {

    const returnProductData = [
                            [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you..."],
                            [1, "Washing machine", 20, 2000, [["User0445","Been using it for 10 years, perfect."],["Marina C.","Flawless."]], [5.0, 5.0], "Assist with AI production line, a washing machine for life."],
                            [1, "Lamp", 20, 100, [["ProCommentor","Nice Lamp!"],["User0002","A little decoration to my pretty room."]], [5.0, 4.5], "Brighten your room with this lamp made with masters based in Germany."]
                        ] //id, name, price, stock, reviews (array), rating (array), desc


    return (
        <>
            <div id="search">
                <div id="productGroup">
                    <p id="searchTitle"> 3 products matching your filters - </p>     
                    <p id="searchFilter"> Contain word "a" | Price between $500 and $3,000 </p>                      
                    <div className="productDesc">
                        <img src={"/photo/"+returnProductData[0][1]+".png"} alt={returnProductData[0][1]} />
                        <div className="descArea">
                            <p className="titleBar">{returnProductData[0][1]}</p>
                            <p>{returnProductData[0][6]}</p>
                            <div className="highlightedFeedback">
                                <p>{returnProductData[0][4][0][1] + " - "}</p>
                                <p className="additionalComment">{returnProductData[0][4][0][0]}</p>
                                <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                            </div>
                            <button type="button" className="directButton">Find out more &rarr;</button>
                        </div>
                    </div>
                    <div className="productDesc">
                        <img src={"/photo/"+returnProductData[1][1]+".png"} alt={returnProductData[1][1]} />
                        <div className="descArea">
                            <p className="titleBar">{returnProductData[1][1]}</p>
                            <p>{returnProductData[1][6]}</p>
                            <div className="highlightedFeedback">
                                <p>{returnProductData[1][4][0][1] + " - "}</p>
                                <p className="additionalComment">{returnProductData[1][4][0][0]}</p>
                                <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                            </div>
                            <button type="button" className="directButton">Find out more &rarr;</button>
                        </div>
                    </div>
                    <div className="productDesc">
                        <img src={"/photo/"+returnProductData[2][1]+".png"} alt={returnProductData[2][1]} />
                        <div className="descArea">
                            <p className="titleBar">{returnProductData[2][1]}</p>
                            <p>{returnProductData[2][6]}</p>
                            <div className="highlightedFeedback">
                                <p>{returnProductData[2][4][0][1] + " - "}</p>
                                <p className="additionalComment">{returnProductData[2][4][0][0]}</p>
                                <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                            </div>
                            <button type="button" className="directButton">Find out more &rarr;</button>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default Search;