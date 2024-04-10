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
    const authToken = 'b09782e294306013522c0610bbbe5e601e021b3b'
    const userId = localStorage.getItem('userid')
    const userName = localStorage.getItem('username')
    const accountType = localStorage.getItem('accountType')

    const loadProd = async () => { 
        const response = await axios.get( 
            'http://127.0.0.1:8000/product/' + pid 
        ); 
        setMessage(response.data.item)
        console.log("single product fetch")
        const responseAll = await axios.get( 
            'http://127.0.0.1:8000/product'
        ); 
        setMessage2(responseAll.data.item)
        set2(true)
        console.log("product fetch")
    }; 

    const loadProd2 = async () => {

        const review = await axios.get( 
        'http://127.0.0.1:8000/review/' + pid
        )
        let temp = []
        temp.push(message.itemID)
        temp.push(message.itemName)
        temp.push(message.itemQuantity)
        temp.push(message.itemPrice)
        if (review.data.message.length==0){
            temp.push([["N/A", "no one have commented yet"]])
            temp.push([0])
        } else {
            temp.push([])
            temp.push([])
            for (let j=0; j<review.data.message.length; j++){
                temp[4].push([review.data.message[j].userID,review.data.message[j].Review])
                temp[5].push([review.data.message[j].Rating])
            }                
        }
        temp.push(message.itemDescription)
        temp.push(message.itemImage)
        temp.push(message.itemCategory)
        setProductData(temp)

        let relatedItem = []

        let relatedCount = 0

        let unRelatedItem = []

        let unrelatedCount = 0

        let filter = message.itemCategory.split(",")
    
        for (let i=0;i<message2.length;i++){
            if (message2[i].itemID == message.itemID){
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
                if(message2[i].itemCategory.split(",").includes(filter[i]) && relatedCount<4 && message.itemQuantity>0){
                    relatedItem.push(temp)
                    relateInd = true
                    relatedCount++
                    break
                }
            }
            if (!relateInd && unrelatedCount<4 && message.itemQuantity>0){
                unRelatedItem.push(temp)
                unrelatedCount++
            }
            if(relatedCount==4){
                break
            }
        }
        let temp2 = []
        if(relatedCount==4){
            temp2 = relatedItem
        } else if (unRelatedItem.length + relatedItem.length<4) {
            temp2 = relatedItem.concat(unRelatedItem)
        } else {
            temp2 = relatedItem.concat(unRelatedItem.slice(0,4-relatedCount))
        }
        setRelatedProduct(temp2)
        console.log("search fetched")
        setRender(true)
    }

     function favoriteEdit(){
        if(accountType==1||accountType==0){
            let loadPost = async() => {
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
                favId.push(favStatus.data[i].itemid)
            }
            console.log(favId)
            setSelfLove(!selfLove)
            console.log(selfLove)
            if(favId.includes(productData[0]) && selfLove){
                alert('Some error occurs, setting item in favorite list for now, try later.')
                setSelfLove(!selfLove)
            } else if (!favId.includes(productData[0]) && !selfLove){
                alert('Some error occurs, setting item not in favorite list for now, try later.')
                setSelfLove(!selfLove)
            } else if (favId.includes(productData[0]) && !selfLove){
                const favStatus = await axios.delete( 
                    'http://127.0.0.1:8000/delete_favorite/'+ pid +'/',{
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + authToken
                            }
                        }
                    )
            } else if (!favId.includes(productData[0]) && selfLove){
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
            }
        }
        loadPost()
        } else {
            alert("You have to login to add item to favorite list!")
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
    },[message2]);

    function redirect(id){
        console.log(id)
        navigate('/product/' + id)
        navigate(0)
    }
    
    function addNotification(stock){
        let currNo = Number(document.getElementById("priceTag").value)
        if (accountType != 0 && accountType != 1){
            alert("You are not logged in! Log in to enjoy the service.")
        } else {
            if (currNo >stock){
                alert("Not enough stock! Please select a valid number.");
            } else if (currNo == 0){
                alert("Please enter a valud non-zero number.")
            } else {
                let loadPost = async () => { 
                    const response = await axios.get(
                        'http://127.0.0.1:8000/cart/'+ userId
                    )
                    if (response.data.cart[pid] + currNo > stock){
                        alert("Not enough stock! Please select a valid number. Note that you already put some of this product in your cart.");
                    } else{
                        const createCart = await axios.get( 
                            'http://127.0.0.1:8000/cart/add/'+userId+'/'+pid+'/'+currNo+'/'
                        ); 
                        alert(createCart.data.message)
                        }
                    }
        
                    loadPost(); 
            }; 

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
            {render?
                <div id="product">
                    <table id="productSession">
                        <tr>
                            <td id="imgArea">
                                <img src={"/photo/"+productData[7]} alt={productData[1]} />
                            </td>
                            <td id="productDesc">
                                <p className="titleBar">{productData[1] + " "}<p id="like">{selfLove? <span><FaHeart onClick={()=>favoriteEdit()}/> You have liked this product!</span>:<span><FaRegHeart onClick={()=>favoriteEdit()}/> This product is not in your favorite list yet...</span>}</p></p>
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
                        {accountType==1||accountType==0? <p>{userName} + ", we need your comment!"</p>:<p>Log in to comment!</p>}
                        {accountType==1||accountType==0? 
                        <p id="rate">
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
                        <div><textarea id="userComment" placeholder="Write down your thought..."></textarea>
                        <button type="button" onClick={()=>sendingMessage()}>Send!</button></div>:<div></div>}
                    </div>
                </div>:<div>Rendering...</div>
            }
        </>
    );
}

export default Product;