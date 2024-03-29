// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122

import "../index.scss"
import * as React from 'react';
import { FaFireAlt, FaSearch } from "react-icons/fa";
import Slider from "react-slider";



const Main = () => {

    const ProductData = [
                            [1, "Table", 20, 1000, [["User0112","The prefect table with high quality."],["Bernald Meriq","Cheapest table I've seen in a while."]], [5.0, 4.5], "Made with the rare oakk wood found in India, the finest table that you..."],
                            [1, "Washing machine", 20, 2000, [["User0445","Been using it for 10 years, perfect."],["Marina C.","Flawless."]], [5.0, 5.0], "Assist with AI production line, a washing machine for life."],
                            [1, "Lamp", 20, 100, [["ProCommentor","Nice Lamp!"],["User0002","A little decoration to my pretty room."]], [5.0, 4.5], "Brighten your room with this lamp made with masters based in Germany."]
                        ] //id, name, price, stock, reviews (array), rating (array), desc


    return (
        <>
            <div id="main">
                <table id="hotProduct">
                    <tr>
                        <td id="img">
                            <img src={"/photo/"+ProductData[0][1]+".png"} alt={ProductData[0][1]} />
                        </td>
                        <td id="productDesc">
                            <h5><FaFireAlt /> Seasonal Trend!</h5>
                            <p className="title">{ProductData[0][1] + " - $" + ProductData[0][3]}<span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span></p>
                            <p className="content">Our customers' feedback</p>
                            <p className="feedback">{ProductData[0][4][0][0] + ": " + ProductData[0][4][0][1]}</p>
                            <p className="feedback">{ProductData[0][4][1][0] + ": " + ProductData[0][4][1][1]}</p>
                            <p id="displayBlock"><span className="chosenPoint">&#x2022;</span> &nbsp; <span className="awaitPoint">&#x2022;</span> &nbsp; <span className="awaitPoint">&#x2022;</span> &nbsp; <span className="awaitPoint">&#x2022;</span> &nbsp; <span className="awaitPoint">&#x2022;</span></p>
                        </td>
                    </tr>
                </table>
                <div id="lowerHalf">
                    <div id="searchArea">
                        <div id="searchGroup">
                            <input type="text" placeholder="Search..."/>
                            <FaSearch />
                        </div>
                        <div id="filter">
                            <div id="filterTitle1">
                                <h5>Price</h5>
                                <hr/>
                                <Slider className="slider" thumbClassName="priceThumb" trackClassName="priceTrack" value={[500,3000]} min={0} max={5000} />       
                                <p id="minRange">$0</p>
                                <p id="maxRange">$5,000</p>
                                <p id="showRange">Selected price range: $500 - $3,000</p>  
                            </div>
                            <div id="filterTitle2">
                                <h5>Category</h5>
                                <hr/>
                                <table>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Furniture</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Food</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Male Clothes</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Female Clothes</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Personal Care</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Beauty</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>TV & Audio</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Kitchen Electronics</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Smart Home</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Other</p>
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
                                            <input type="checkbox" /><p>Hot Sales</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Campaign</p>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>Fit for you</p>
                                            </label>
                                        </td>
                                        <td>
                                            <label>
                                            <input type="checkbox" /><p>High stock</p>
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="recommendProduct">
                        <p id="titleRecommendation">Recommend for you base on your search history</p>
                        <div id="productGroup">                      
                            <div className="productDesc">
                                <img src={"/photo/"+ProductData[0][1]+".png"} alt={ProductData[0][1]} />
                                <div className="descArea">
                                    <p className="titleBar">{ProductData[0][1]}</p>
                                    <p>{ProductData[0][6]}</p>
                                    <div className="highlightedFeedback">
                                        <p>{ProductData[0][4][0][1] + " - "}</p>
                                        <p className="additionalComment">{ProductData[0][4][0][0]}</p>
                                        <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                                    </div>
                                    <button type="button" className="directButton">Find out more &rarr;</button>
                                </div>
                            </div>
                            <div className="productDesc">
                                <img src={"/photo/"+ProductData[1][1]+".png"} alt={ProductData[1][1]} />
                                <div className="descArea">
                                    <p className="titleBar">{ProductData[1][1]}</p>
                                    <p>{ProductData[1][6]}</p>
                                    <div className="highlightedFeedback">
                                        <p>{ProductData[1][4][0][1] + " - "}</p>
                                        <p className="additionalComment">{ProductData[1][4][0][0]}</p>
                                        <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                                    </div>
                                    <button type="button" className="directButton">Find out more &rarr;</button>
                                </div>
                            </div>
                            <div className="productDesc">
                                <img src={"/photo/"+ProductData[2][1]+".png"} alt={ProductData[2][1]} />
                                <div className="descArea">
                                    <p className="titleBar">{ProductData[2][1]}</p>
                                    <p>{ProductData[2][6]}</p>
                                    <div className="highlightedFeedback">
                                        <p>{ProductData[2][4][0][1] + " - "}</p>
                                        <p className="additionalComment">{ProductData[2][4][0][0]}</p>
                                        <span className="star"> &#9733; &#9733; &#9733; &#9733; &#9733;</span>
                                    </div>
                                    <button type="button" className="directButton">Find out more &rarr;</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;