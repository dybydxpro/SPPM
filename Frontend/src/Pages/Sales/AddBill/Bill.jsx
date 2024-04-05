import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './TextFields';
import './add.css'
import { Select, TextInput } from "@mantine/core";
import { serverUrl } from '../../../Config';
import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";



export default function Bill() {
    const navigate = useNavigate()
    const [saleId, setSaleId] = useState([]);
    const [product, setProduct] = useState([]);
    const [productdetails, setProductDetails] = useState([]);
    const [batch, setBatch] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [stock, setStock] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [billCustomer, setBillCustomer] = useState([]);
    const [productId, setProductId] = useState([])
    const [productName, setProductName] = useState([])
    const [batchNo, setBatchNo] = useState([]);
    const [sellingPrice, setSellingPrice] = useState([]);
    const [onhandqty, setOnhandqty] = useState([]);
    const [billingQty, setBillingQty] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [gross, setGross] = useState([]);
    const [net, setNet] = useState([]);


    const test = () => {
        axios
            .post(`${serverUrl}/sale/test`, tempData, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                console.log(res.body)
            })
            .catch(err => {
                console.log(err)
            })

    }


    const save = () => {

        const disc = parseFloat(discount) || 0;
        const amount = parseFloat(gross) || 0;
        const result = amount - disc;
        const headers = {
            customerId: billCustomer,
            discount: discount,
            gross: gross,
            net: result,
        }
        axios
            .post(`${serverUrl}/sale/`, headers, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                const saleId = res.data;
                console.log(saleId);
                console.log(res.data);
                setSaleId(res.data);
                console.log(tempData);
                axios
                    .post(`${serverUrl}/sale/lines/${saleId}`, { tempData }, {
                        headers: {
                            "authorization": localStorage.getItem("token")
                        },
                    })
                    .then(res => {
                        console.log(res.data)
                        navigate('/Print/'+saleId);
                    })
                    .catch(err => {
                        console.log(err)
                    })

            })
            .catch(err => {
                console.log(err)
            })

    }



    const handleSubmit = (data) => {
        const amount = parseFloat(gross) || 0;
        const result = data.billingQty * data.sellingPrice + amount;

        setGross(result);
        setTempData([...tempData, data]);
        setProductId('');
        setSellingPrice('');
        setBillingQty('');
        setBatchNo('');
        setProductName('');
        setOnhandqty('');

    };


    const getcustomer = () => {
        axios
            .get(`${serverUrl}/customer`, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                setCustomer(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getproduct = () => {
        axios
            .get(`${serverUrl}/product`, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getproductdetails = (pid, formik) => {
        axios
            .get(`${serverUrl}/product/byid/` + pid, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                console.log(res)
                setProductDetails(res.data)
                setProductName(res.data.productName)
                //formik.setFieldValue('productName', res.data.productName)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getBatch = (bid, formik) => {
        axios
            .get(`${serverUrl}/batches/byid/` + bid, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                console.log(res.data)
                setBatch(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getStock = (bid, formik) => {
        axios
            .get(`${serverUrl}/stock/byid/` + bid, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                console.log(res.data)
                setStock(res.data)
                setOnhandqty(res.data.quantity)
                setSellingPrice(res.data.sellingPrice)
                //formik.setFieldValue('sellingPrice', res.data.sellingPrice)
                //formik.setFieldValue('onhandqty', res.data.quantity)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleQuantityChange = (e) => {
        setBillingQty('');
        console.log(e.target.value);
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity)) {
            setBillingQty(newQuantity);
        }
    };

    const handleDiscountChange = (event) => {
        setDiscount(parseFloat(event.target.value));
    };


    useEffect(() => {
        getproduct()
        getcustomer()
    }, [])



    return (
        <>
            <Navbar />
            <div className="container mt-3" >
                <div className="row">
                    <div className="col md-5" >
                        <Formik
                            initialValues={{
                                productId: '',
                                productName: '',
                                BatchNo: '',
                                sellingPrice: '',
                                billingQty: '',
                                customer: '',
                                onhandqty: '',
                            }}>
                            {formik => {
                                return (
                                    <div>
                                        <h1 className="my-4 font-weight-bold-display-4">Add Bill</h1>
                                        <Form>
                                            <Field name="customer">
                                                {({
                                                    field,// { name, value, onChange, onBlur }
                                                    form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                    meta,
                                                }) => {
                                                    console.log(errors);
                                                    return (
                                                        <Select
                                                            value={billCustomer}
                                                            error={errors['customer']}
                                                            required
                                                            onChange={(v) => {

                                                                setBillCustomer(v)
                                                            }}
                                                            label="Select Customer"
                                                            placeholder="Select a Customer"
                                                            data={customer.map(cid => (
                                                                { value: cid.customer_id, label: cid.customer_id }
                                                            ))}
                                                        />
                                                    )
                                                }}
                                            </Field>
                                            <Field name="Product ID">
                                                {({
                                                    field,// { name, value, onChange, onBlur }
                                                    form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                    meta,
                                                }) => {
                                                    console.log(errors);
                                                    return (
                                                        <Select
                                                            value={productId}
                                                            error={errors['productId']}
                                                            required
                                                            onChange={(v) => {
                                                                //formik.setFieldValue('productId', v)
                                                                //setFieldValue('BatchNo', '');
                                                                setProductId(v)
                                                                console.log(v)
                                                                getBatch(v, formik)
                                                                getproductdetails(v, formik)
                                                            }}
                                                            label="Product ID"
                                                            placeholder="Select a product ID"
                                                            data={product.map(pid => (
                                                                { value: pid.productId, label: pid.productId }
                                                            ))}
                                                        />
                                                    )
                                                }}
                                            </Field>
                                            <TextFields label="Product Name" name="productName" type="text" readOnly={true} value={productName} />
                                            <Field name="BatchNo">
                                                {({
                                                    field,// { name, value, onChange, onBlur }
                                                    form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                    meta,
                                                }) => {
                                                    console.log(errors);
                                                    return (
                                                        <Select
                                                            value={batchNo}
                                                            error={errors['batchNo']}
                                                            required
                                                            onChange={(v) => {
                                                                setBatchNo(v)
                                                                //formik.setFieldValue('batchNo', v)
                                                                getStock(v)
                                                            }}
                                                            label="Batch No"
                                                            placeholder="Select a batch No"
                                                            data={batch.map(bid => (
                                                                { value: bid.batchNo, label: bid.batchNo }
                                                            ))}
                                                        />
                                                    )
                                                }}
                                            </Field>


                                            <TextFields label="Selling Price" name="sellingPrice" type="text" readOnly={true} value={sellingPrice} />
                                            <TextFields label="On Hand Quantity" name="onhandqty" type="text" readOnly={true} value={onhandqty} />
                                            <label htmlFor="billingQty">Quantity:</label>
                                            <input
                                                className={`form-control shadow-none`}
                                                type="number"
                                                id="billingQty"
                                                name="billingQty"
                                                min="1"
                                                onChange={handleQuantityChange}
                                                value={billingQty}
                                                autoComplete="off"
                                            />

                                            <TextFields label="Gross value" name="gross" type="text" readOnly={true} value={gross} />


                                            <label htmlFor="discount">Enter The discount</label>
                                            <input
                                                className={`form-control shadow-none`}
                                                autoComplete="off"
                                                type="number"
                                                id="discount"
                                                name="discount"
                                                min="1"
                                                onChange={handleDiscountChange}
                                                value={discount}
                                            />

                                            <button className="add"
                                                onClick={() => {
                                                    const data = {
                                                        productId: productId,
                                                        productName: productName,
                                                        BatchNo: batchNo,
                                                        sellingPrice: sellingPrice,
                                                        billingQty: billingQty
                                                    }
                                                    handleSubmit(data)
                                                }}
                                            >Add Line</button>
                                                <button className="btn btn-primary"
                                                    onClick={() => {
                                                        save();
                                                    }}>Print and Save</button>
                                            <button className="reset" type='reset'>Reset</button>
                                            <Link to={'/bill'}>
                                                <button className="back">Back</button>
                                            </Link>
                                        </Form>
                                    </div>
                                )
                            }}
                        </Formik>
                    </div>

                    <div className="col md-7" style={{
                        height: 300,
                        overflowY: 'scroll',
                        marginTop: 105
                    }}>

                        <table className="table table-sm">
                            <thead>
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
                                {tempData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.productId}</td>
                                        <td>{data.productName}</td>
                                        <td>{data.batchNo}</td>
                                        <td>{data.billingQty}</td>
                                        <td>{data.sellingPrice}</td>
                                        <td>{data.billingQty * data.sellingPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );
};
