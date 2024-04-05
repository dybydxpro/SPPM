import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { serverUrl } from '../../../../Config';

export default function AddCustomer() {
    //----------------------------------------------------Price-------------------------------------
    const [displayprice, setdisplaprice] = useState([]);
    const [availablequantity, setavailablequantity] = useState([]);


    // const afteradd=()=>{
    //     const data = {
    //         productId: code,
    //         quantity: quantity,
    //         price: displayprice,
    //         netAmount:netTotal,
    //         discount:discount,
    //         totalAmount:totalSum,
    //     }
    //     console.log(data);
    // }
    const fetchprice = (pid) => {
        axios
            .get(`${serverUrl}/stock/setproduct/${pid}`, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                setdisplaprice(res.data);
                // console.log(res.data.sellingPrice);
                setdisplaprice(res.data.sellingPrice);
                setavailablequantity(res.data.quantity);
            })
            .catch(err => {
                console.log(err)
            })
    }

    //-----------------------------------------------fetch batch No----------------------------------
    const [displayName, setdisplayname] = useState([]);
    const fetchname = (bcode) => {
        axios
            .get(`${serverUrl}/product/setproduct/${bcode}`, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
            .then(res => {
                setdisplayname(res.data);
                // console.log(res.data);
                setName(res.data.productName);
                fetchprice(res.data.productId);
            })
            .catch(err => {
                console.log(err)
            })
    }
    //-----------------------------------------------------------------------------------------------

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [totalSum, setTotalSum] = useState(0.0);
    const [discount, setDiscount] = useState(0.0);
    const [discountInvoice, setDiscountInvoice] = useState(0.0);
    const [netTotal, setNetTotal] = useState(0.0);
    const [balance, setBalance] = useState(0.0);
    const [paid, setPaid] = useState(0.0);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const saveUser = () => {
        // navigate('addCustomer');  
        let Mobile = prompt("Please enter your Mobile Number", "");
        let Address = prompt("Please enter your Address", "");
        let Name = prompt("Please enter your Name", "");
        if (Mobile.length === 10) {
            alert("Customer Added Successfully" + Mobile.length);
        }
        else {
            saveToDB();
        }
    }
    const save = () => {
        console.log("saving");
        console.log("code ", code + " name ", name + " price ", price + " quantity ", quantity + " total ", total + " discount ", discount + " discountInvoice ", discountInvoice + " balance ", balance + " paid ", paid);

        saveToDB();
        window.location.reload();
        //Database Data to DB

    }
    /*const print=()=>{
        alert("Invoice Printed Successfully");
    }*/
    const addProduct = (e) => {
        const Sum = displayprice * quantity - discount;
        setTotalSum(totalSum + Sum);
        setItems([...items, { code: code, name: name, price: displayprice, quantity: quantity, discount: discount, total: Sum }]);
        alert("Product Added Successfully Rs." + Sum + "/- ");
        // setNetTotal(totalSum - discountInvoice)
        // console.log(netTotal);
        // const data = {
        //     productId: code,
        //     quantity: quantity,
        //     price: displayprice,
        //     netAmount: netTotal,
        //     discount: discount,
        //     totalAmount: Sum,
        // }
        // console.log(data);


        clearAllProduct();

    }

    const productDelete = (index, e) => {
        setItems(items.filter((v, i) => i !== index));
        setTotalSum(totalSum - items[index].total);
    }
    function changePaid(event) {
        setPaid(event.target.value);
    }
    function changeDiscount(event) {
        setDiscountInvoice(event.target.value);
    }
    const pdfRef = useRef(null);

    const handleDownload = () => {
        const content = pdfRef.current;

        const doc = new jsPDF('p', 'pt', 'a4');
        doc.html(content, {
            callback: function (doc) {
                var pageCount = doc.internal.getNumberOfPages();
                doc.deletePage(pageCount);
                doc.save('sample.pdf');
                saveToDB();
            },
            width: 900, // <- here
            windowWidth: 5500
        });
        window.location.reload();
    };
    function clearAllProduct() {
        document.getElementById("code").value = "";
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("discount").value = "";
        document.getElementById("code").focus();
    }
    function saveToDB() {
        // window.location.reload(true);
        var today = new Date();
        var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
        var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
        var dateTime = date + '' + time;
        var setdate=dateTime.slice(3,13)
        console.log(setdate);

        //get the value in the table

        items.map((item, index) => {

            const data = {
                customerId:setdate,
                productId: item.code,
                quantity: item.quantity,
                price: item.price,
                netAmount: netTotal,
                discount: discount,
                totalAmount: item.total,
            }
            console.log(data);
            axios.post(`${serverUrl}/sale`, data, {
                headers: {
                    "authorization": localStorage.getItem("token")
                },
            })
                .then(res => {
                    console.log(res.data);
                })



        }

        )
    }
    
    function decrementQuantity( ){
        
    }
    function searchBill() {
        navigate('/search-bill');
    }





    return (

        <div>
            <div className="row">
                <div className="col-sm">
                    <h1>Add Product</h1>
                    <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input type="text" className="form-control" id="code" placeholder="Enter Code"
                            onChange={(e) => {
                                setCode(e.target.value);
                                fetchname(e.target.value);
                                // console.log(e.target.value);
                            }
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Name"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control" id="price" placeholder="Enter Price"
                            value={displayprice}
                            readOnly


                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="quantity">Availabe Quantity</label>
                        <input type="number" className="form-control" id="availablequantity" placeholder="Available Quantity"
                            readOnly
                            value={availablequantity}
                        />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" className="form-control" id="quantity" placeholder="Enter Quantity"
                            onChange={(e) => setQuantity(e.target.value)
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount">Discount</label>
                        <input type="number" className="form-control" id="discount" placeholder="Enter Discount"
                            onChange={(e) => setDiscount(e.target.value)
                            } />
                    </div>
                    <button type="submit" className="btn btn-outline-success mt-2" onClick={(e) => {
                        addProduct(e);
                        // afteradd();
                    }}>Add Product</button>
                </div>
                <div className="col-sm" >
                    <h1>Billing Information</h1>
                    <div className="form-group row">
                        <label htmlFor="total" className="col-sm-2 col-form-label">Total</label>
                        <div className="col-sm-10">
                            <p className="form-control-plaintext" id="total">{totalSum}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="Discount" className="col-sm-2 col-form-label">Discount</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="discountInvoice" placeholder="Enter Discount" onChange={changeDiscount} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="net" className="col-sm-2 col-form-label">Net</label>
                        <div className="col-sm-10">
                            <p className="form-control-plaintext" id="Net">{(totalSum - discountInvoice)}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="paid" className="col-sm-2 col-form-label">Paid</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="paid" placeholder="Paid" onChange={changePaid} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="Balance" className="col-sm-2 col-form-label">Balance</label>
                        <div className="col-sm-10">
                            <p className="form-control-plaintext" id="Balance">{(totalSum - discountInvoice) - paid}</p>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info mt-2 m-1 " onClick={save}>Save</button>
                    <button type="submit" className="btn btn-dark mt-2 m-1" onClick={handleDownload}>Print</button>
                    {/* <button type="submit" className="btn btn-dark mt-2 m-1" onClick={saveUser}>Loyalty Points</button> */}
                    <button type="submit" className="btn btn-dark mt-2 m-1" onClick={searchBill}>Search Bill</button>

                </div>
            </div>
            <div ref={pdfRef}>
                <table className="table" id="table_data" >
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {items.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.discount}</td>
                                <td>{item.price * item.quantity - item.discount}</td>
                                <td><button type="submit" className="btn btn-danger mt-2 m-1" onClick={e => productDelete(index, e)}>Delete</button></td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

