// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import { FaMinus, FaPlus, FaStar, FaRegStar, FaHeart, FaRegHeart} from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaRegStarHalfStroke } from "react-icons/fa6";
import axios from "axios";



const Product = () => {

    let {pid} = useParams()
    let navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    const [selfRate, setSelfRate] = useState(5);
    const [selfLove, setSelfLove] = useState(true);
    const [productData, setProductData] = useState([])
    const [relatedProduct, setRelatedProduct] = useState([])
    const [render, setRender] = useState(false)
    const [signal2, set2] = useState(false)
    const authToken = localStorage.getItem('token') //Admin token to get access
    const userId = localStorage.getItem('userid') //Get user id 
    const userName = localStorage.getItem('username') //Get username
    const accountType = localStorage.getItem('accountType') //Get user type

    const loadProd = async () => { 
        const response = await axios.get( 
            'http://127.0.0.1:8000/product/' + pid 
        ); 
        setMessage(response.data.item)
        console.log("single product fetch")
        const responseAll = await axios.get( 
            'http://127.0.0.1:8000/product'
        ); 
        setMessage2(responseAll.data.item) //Get all product information for later use
        set2(true)
        console.log("product fetch")
    }; //Fetch Step 1: Get product information

    const loadProd2 = async () => { //Fetch Step 2: Get other information, such as favorite list and review
        try{ //Call backend to get favorite status of this product
            const favStatus = await axios.get( 
                'http://127.0.0.1:8000/display_favorite/',{
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authToken
                        }
                    }
                )
            let favId = []
            for(let i=0; i<favStatus.data.length;i++){
                favId.push(parseInt(favStatus.data[i].itemid))
            }
            setSelfLove(favId.includes(parseInt(pid)))
        } catch{
            setSelfLove(false)
        }

        const review = await axios.get( //Call backend to get review and rating of this product
        'http://127.0.0.1:8000/review/' + pid
        )
        let temp = []
        temp.push(message.itemID)
        temp.push(message.itemName)
        temp.push(message.itemQuantity)
        temp.push(message.itemPrice)
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
        temp.push(message.itemDescription) //Note no need to shorten the item description now
        temp.push(message.itemImage)
        temp.push(message.itemCategory)
        setProductData(temp)

        let relatedItem = []

        let relatedCount = 0

        let unRelatedItem = []

        let unrelatedCount = 0

        let filter = message.itemCategory.split(",")
    
        for (let i=0;i<message2.length;i++){ //Loop all item to find related item of this product so it can be recommended
            if (message2[i].itemID == message.itemID){ //Skip the current product
                continue
            }
            const review = await axios.get( 
            'http://127.0.0.1:8000/review/' + message2[i].itemID
            )
            let temp = []
            let relateInd = false
            temp.push(message2[i].itemID)
            temp.push(message2[i].itemName)
            temp.push(message2[i].itemDescription)
            temp.push(message2[i].itemImage)
            for(let i=0;i<filter.length;i++){
                if(message2[i].itemCategory.split(",").includes(filter[i]) && relatedCount<4 && message.itemQuantity>0){ //If the product share same category with the current product, it is a related product, the list subject to maximum 4 products to minimize runtime
                    relatedItem.push(temp)
                    relateInd = true
                    relatedCount++
                    break
                }
            }
            if (!relateInd && unrelatedCount<4 && message.itemQuantity>0){ //Other products are unrelated item
                unRelatedItem.push(temp)
                unrelatedCount++
            }
            if(relatedCount==4){ //Need 4 related product only, thus breaking the loop if criteria meet to save runtime
                break
            }
        }
        let temp2 = []
        if(relatedCount==4){
            temp2 = relatedItem
        } else if (unRelatedItem.length + relatedItem.length<4) {
            temp2 = relatedItem.concat(unRelatedItem) //If not enough related item, show unrelated item as well, subject to a maximum of 4 products 
        } else {
            temp2 = relatedItem.concat(unRelatedItem.slice(0,4-relatedCount))
        }
        setRelatedProduct(temp2)
        console.log("search fetched")
        setRender(true)
    }

     function favoriteEdit(){ //Change the favorite status in the product page 
        if(accountType==1||accountType==0){ //Only user/admin have favorite list
            let loadPost = async() => {
                const favStatus = await axios.get( 
                    'http://127.0.0.1:8000/display_favorite/',{//Call backend to get the favorite status of the product (in an array of user's favorite list)
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + authToken
                            }
                        }
                    )
                let favId = []
                for(let i=0; i<favStatus.data.length;i++){
                    favId.push(parseInt(favStatus.data[i].itemid))
                }
                console.log(favId)
                console.log(productData[0])
                console.log(favId.includes(productData[0]))
                console.log(selfLove)
                if(favId.includes(productData[0]) && !selfLove){ //Unexpected case where the display and real favorite status contradict
                    alert('Some error occurs, setting item in favorite list for now, try later.')
                    setSelfLove(true)
                } else if (!favId.includes(productData[0]) && selfLove){ //Unexpected case where the display and real favorite status contradict
                    alert('Some error occurs, setting item not in favorite list for now, try later.')
                    setSelfLove(false)
                } else if (favId.includes(productData[0]) && selfLove){ //Remove the product from favorite list
                    const favStatus = await axios.delete( 
                        'http://127.0.0.1:8000/delete_favorite/'+ pid +'/',{
                                headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Token ' + authToken
                                }
                            }
                        )
                    setSelfLove(false)
                } else if (!favId.includes(productData[0]) && !selfLove){ //Add the product from favorite list
                    const favStatus = await axios.post( 
                        'http://127.0.0.1:8000/add_to_favorite/',{
                            item_id: productData[0]
                        }, {
                                headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Token ' + authToken
                                }
                            }
                        )
                    setSelfLove(true)
                }
            }
            loadPost()
            } else {
                alert("You have to login to add item to favorite list!") //Non-user case
                setSelfLove(false)
            }
        }

    useEffect(() => {
        loadProd(); 
    },[]);

    useEffect(() => {
        if(signal2){
            loadProd2();
        }
    },[message2]); //Ensure fetch in order

    function redirect(id){
        console.log(id)
        navigate('/product/' + id)
        navigate(0)
    } //Allow redirect to related product page
    
    function addNotification(stock){ //Add product to shopping cart
        let currNo = Number(document.getElementById("priceTag").value)
        if (accountType != 0 && accountType != 1){ //Non-user case
            alert("You are not logged in! Log in to enjoy the service.")
        } else {
            if (currNo >stock){ //Quantity propose to add in cart is more than available stock
                alert("Not enough stock! Please select a valid number.");
            } else if (currNo == 0){ //No quantity selected
                alert("Please enter a non-zero number.")
            } else {
                let loadPost = async () => { 
                    const response = await axios.get(
                        'http://127.0.0.1:8000/cart/'+ userId //Call backend to get the shopping cart information
                    )
                    if (response.data.cart[pid] + currNo > stock){
                        alert("Not enough stock! Please select a valid number. Note that you already put some of this product in your cart."); //Total of proposed quantity and quantity alreadty in cart is larger than the available stock
                    } else{
                        const createCart = await axios.get( 
                            'http://127.0.0.1:8000/cart/add/'+userId+'/'+pid+'/'+currNo+'/' //If no error, add item in cart and edit database
                        ); 
                        alert(createCart.data.message) //Show success message 
                        }
                    }
        
                    loadPost(); 
            }; 

        }
        
    }

    function increaseQ(){ //Add quantity of proposed quantity to add to cart
        let Quan = document.getElementById("priceTag")
        let temp = Number(Quan.value)
        Quan.value = temp + 1
    }

    function decreaseQ(){ //Minus quantity of proposed quantity to add to cart
        let Quan = document.getElementById("priceTag")
        let temp = Number(Quan.value)
        Quan.value = Math.max(temp - 1,0)
    }

    function changeRate(e, mouse){ //Change the proposed rating for the product
        if (mouse.pageX > mouse.target.getBoundingClientRect().x + mouse.target.getBoundingClientRect().width/2){
            setSelfRate(e + 1)
        } else {
            setSelfRate(e + 0.5)
        }
    }

    function sendingMessage(){ //Send the proposed review for the product
        let message = document.getElementById("userComment")
        let sendStr =  message.value
        let loadPost = async () => { 
            const response = null
            try{
                const response = await axios.get(
                    'http://127.0.0.1:8000/review/add/' + pid + '/' + userId + '/' + sendStr + '/' + selfRate + '/',{ //Call backend to post the review
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authToken
                        }
                    }
                )
                alert("Comment sent!")
            }
            catch(err){ //Non-user case
                alert("You have to login to give comment!")
            }
            message.value = "" //Clear text box
        }
        loadPost(); 
    }

    return (
        <>
            {render?
                <div id="product">
                    <table id="productSession"> {/* Showing product information */}
                        <tr>
                            <td id="imgArea">
                                <img src={"/photo/"+productData[7]} alt={productData[1]} />
                            </td>
                            <td id="productDesc">
                                <p className="titleBar">{productData[1] + " "}<p id="like">{selfLove? <span><FaHeart onClick={()=>favoriteEdit()}/> You have liked this product!</span>:<span><FaRegHeart onClick={()=>favoriteEdit()}/> This product is not in your favorite list yet...</span>}</p></p>
                                <pre>{productData[6] + "\n\n*Remaining stock(s): " + productData[2] +"\n\n*Price: $" + productData[3]}</pre>
                                <div id="toOrder">
                                    <p>Quantity: </p>
                                    <FaMinus onClick={()=>decreaseQ()}/><input type="number" id="priceTag" placeholder={0} /><FaPlus onClick={()=>increaseQ()}/> {/* Showing proposed quantity to add to cart */}
                                    <button type="button" className="directButton" onClick={()=>addNotification(productData[2])}>Add to shopping cart &rarr;</button> {/* Adding proposed quantity of product to cart */}
                                </div>
                            </td>
                        </tr>
                    </table>
                    <hr/>
                    <div id="otherProductSession">
                        <p>You might also found these products interesting...</p> {/* Recommend related product (Not base on user) */}
                        <table>
                            <tr>
                                {
                                    relatedProduct.map((element, index)=>{
                                        return (
                                            <span>
                                                <td className="productCard">
                                                    <img src={"/photo/" + element[3]} alt={element[1]} /> 
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
                    <div id="commentSession"> {/* Showing review and rating from other user */}
                        {
                            productData[4].map((element, index)=>{
                                let rating = productData[5][index]
                                let ratingHolders = [0,1,2,3,4].map((element)=>{
                                    let ratingHolder = null
                                    if(rating>=element+1){ {/* Showing individual rating */}
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
                                        <p className="userName">{element[0] + ":"}</p> {/* Showing review */}
                                        <span className="star">{ratingHolders}</span>
                                        <p className="userComment">{element[1]}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr/>
                    <div id="ratingSession"> {/* Allowing the user to rate or review the product & propmt non-user to log in and rate or review */}
                        {accountType==1||accountType==0? <p>{userName}, we need your comment!</p>:<p>Log in to comment!</p>}
                        {accountType==1||accountType==0? 
                        <p id="rate"> {/* Allow user to set rating by moving the mouse around, with description of each range of rating */}
                        {
                            ["I kinda like this product!", "Looks fine to me~", "I am not into this."].map((element, index)=>{
                                if (selfRate>4 && index == 0){
                                    return <span id="Rating">{element}</span>
                                } else if (selfRate>1.5 && selfRate<4.5  && index == 1){
                                    return <span id="Rating">{element}</span>
                                } else if (selfRate<2 && index == 2) {
                                    return <span id="Rating">{element}</span>
                                }
                            })
                        }
                        { 
                            [0,1,2,3,4].map((element)=>{
                                let ratingHolder = null 
                                if(selfRate>=element+1){
                                    ratingHolder = <FaStar id={element} onMouseOver={(e)=>changeRate(element,e)}/>
                                } else {
                                    if(selfRate == element+0.5){
                                        ratingHolder = <FaRegStarHalfStroke id={element} onMouseOver={(e)=>changeRate(element,e)}/>
                                    } else {
                                        ratingHolder = <FaRegStar id={element} onMouseOver={(e)=>changeRate(element,e)}/>
                                    }
                                }
                                return ratingHolder
                            })
                        }
                        </p>:<p></p>}
                        {accountType==1||accountType==0?
                        <div><textarea id="userComment" placeholder="Write down your thought..."></textarea> {/* Allow writing review and send to database */}
                        <button type="button" onClick={()=>sendingMessage()}>Send!</button></div>:<div></div>}
                    </div>
                </div>:<div>Rendering...</div>
            }
        </>
    );
}

export default Product;