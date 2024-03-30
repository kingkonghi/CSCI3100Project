// Student Name : Lee Ho Kan, Leung Tsz Chung, Lee Kong Yau, Lui Chak Sum, Ho Yan Tung
// Student ID : 1155157376, 1155141896, 1155149600, 1155158054, 1155176122
import "../index.scss"
import * as React from 'react';
import { useParams } from 'react-router-dom'

const Order = () => {

    let {oid} = useParams()

    return (
        <>
            <p>{oid}</p>
            <p>Sam is working on it...</p>
        </>
    );
}

export default Order;