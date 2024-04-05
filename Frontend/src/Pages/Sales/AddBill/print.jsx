import React, { useState, useRef } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'
import { Select, TextInput } from "@mantine/core";
import { serverUrl } from '../../../Config';
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useParams, Link } from "react-router-dom";
import ReactToPrint from 'react-to-print';


export default function Print() {

    const { saleId } = useParams();
    const ref = useRef()
    const [header, setHeader] = useState([]);
    const [lines, setLines] = useState([]);


    const fetchHeader = () => {
        axios
            .post(`${serverUrl}/sale/byid`, { saleId }, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                setHeader(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchLines = () => {
        console.log(saleId);
        axios
            .post(`${serverUrl}/sale/getlines`, { saleId }, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                setLines(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchHeader();
        fetchLines();
    }, [])




    return (
        <>
            <Navbar />
            <div className="container mt-3" >
                <div className="row">
                    <div ref={ref} className="col md-7" style={{
                        height: '100%',
                        //overflowY: 'scroll',
                        marginTop: 5
                    }}>
                        <h1 style={{ backgroundColor: "blue", color: "Black", marginTop: 50, padding: 5 }}>Sales Print</h1>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Sales Summary </th>
                                </tr>
                                <tr>
                                    <th>Sales ID</th>
                                    <th>Customer ID</th>
                                    <th>Gross Amount</th>
                                    <th>Discount Amount</th>
                                    <th>Net Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>{header.saleId}</td>
                                    <td>{header.customer_id}</td>
                                    <td>{header.gross}</td>
                                    <td>{header.discount}</td>
                                    <td>{header.net}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Product Lines</th>
                                </tr>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Batch No</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lines.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.productId}</td>
                                        <td>{data.productName}</td>
                                        <td>{data.batchNo}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.sellingPrice}</td>
                                        <td>{data.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col" style={{
                    margin: '10px'
                }}>
                    <ReactToPrint
                        trigger={() => <button className='btn btn-primary mx-auto'>Print</button>}
                        content={() => ref.current}
                        documentTitle='Bill'
                        pageStyle="print"
                    />
                    <div className="col" style={{ margintop: '10px', marginBlock: '10px'}}> {/* Adding margin top here */}
                        <Link to={'/bill'}>
                            <button className='btn btn-primary mx-auto'>New Bill</button>
                        </Link>
                        <Link to={'/viewbill'}>
                            <button className='btn btn btn-secondary mx-auto'>View Sales History</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
