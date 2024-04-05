import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import ReactToPrint from 'react-to-print';
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import { Center } from '@mantine/core';
import { serverUrl } from '../../../Config';
 import "../../Login/Login.css"
 import * as GrIcons from "react-icons/gr";
 import * as TbIcons from "react-icons/tb";
 import * as FaItems from "react-icons/fa";

export default function ViewStock() {
  const navigate = useNavigate()
  const [batch, setBatches] = useState([]);
  const [remove, setdelete] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');

  // const [afterSearch, setafterSearch] = useState('')

  const fetch = () => {
    axios
      .get(`${serverUrl}/stock`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setBatches(res.data)
        setfilterdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  //--------------------------------------------------------
  const deletestock = (bNo) => {
    axios
      .delete(`${serverUrl}/stock/` + bNo, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then((res) => {

        setdelete(res.data)

      })
      .catch((err) => console.log(err))
  }
  //-----------------------------------search-------------------------------
  const filter=(event)=>{
    const getsearch=event.target.value;
    setquery(getsearch);
    // console.log(getsearch);
    if(getsearch.length>0){
      const searchdata=batch.filter((item)=>item.productId.toLowerCase().includes(getsearch));
      setBatches(searchdata);
    }else
    {
      setBatches(filterdata);
    }
  }


  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="Auth-form-title1">
          <h1>Stock Manage</h1>
        </div>
        <div className="row">
          <div className="col">
            <Link to={'/addstock'}>
              <button className="btn btn-warning">Add New Product&nbsp;<AiIcons.AiOutlineDropbox /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addwarehouse'}>
              <button className="btn btn-warning">Add New Warehouse&nbsp;&nbsp;<FaItems.FaWarehouse/></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addbatch'}>
              <button className="btn btn-primary">Add New Batch Detalis&nbsp;&nbsp;<GrIcons.GrNotes /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addtostock'}>
              <button className="btn btn-primary">Add Products To Stock&nbsp;&nbsp;<AiIcons.AiOutlineStock/></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewgrns'}>
              <button className="btn btn-success">View GRNs And Print&nbsp;&nbsp;<AiIcons.AiFillPrinter/></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/outofstock'}>
              <button className="btn btn-danger">Out Of Stock Batches &nbsp;&nbsp;<AiIcons.AiFillWarning/></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/batchexpired'}>
              <button className="btn btn-danger">Expired Batches In Stocks&nbsp;&nbsp;<AiIcons.AiFillWarning/></button>
            </Link>
          </div>
{/* ------------------------------Search----------------------------------------------------------------- */}
          <div className="row">
            <h2 style={{ marginTop: 30,marginBottom:10, backgroundColor: "blue", color: "white",width:270,padding:5}}>Search In Stock<HiIcons.HiSearchCircle/></h2>
            
          </div>
          <div className="row">
          <input
            style={{ width: 500,background:'#D2EDFC' }}
            type="text"
            className="form-control mt-1"
            placeholder="Search......"
            value={query}
            onChange={(e) => filter(e)}
          />
          <div className="col">
            <button
            style={{
              borderStyle:'none',
              marginTop:6,
              padding:6,
              color:"white",
              background:'black'

            }}>Search &nbsp;&nbsp;<HiIcons.HiSearchCircle/></button>
          </div>
          </div>
{/* //--------------------------------------------------------------------------------------------- */}
          <div className="row">
            <h2 style={{ backgroundColor: "blue", color: "white" ,marginTop:50, width:175,padding:5}}>Stock Table</h2>
          </div>
          <div className="row">
            <div className="col md-7" style={{
              height: 300,
              overflowY: 'scroll',
              marginTop: 5
            }}>
              <table className="table table-striped table-dark">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Warehouse</th>
                    <th scope="col">Batch Number</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Buying Price (Rs.)</th>
                    <th scope="col">Selling Price (Rs.)</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    batch.map(getb => (
                      <tr key={getb.id}>
                        <td>{getb.productId}</td>
                        <td>{getb.warehouseID}</td>
                        <td>{getb.batchNo}</td>
                        <td>{getb.quantity}</td>
                        <td>{getb.buyingPrice}</td>
                        <td>{getb.sellingPrice}</td>
                        <td>
                          <Link to={'/updatestock/' + getb.batchNo}>
                            <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                          </Link>
                        </td>
                        <td>
                          <Link to={'/stock'}>
                            <button className="btn btn-danger"
                              onClick={() => {
                                deletestock(getb.batchNo)
                                // window.confirm('Are you sure to delete this stock')
                                window.alert('stock Deleted Sucessfully')
                                fetch()
                              }}
                            ><AiIcons.AiFillDelete /></button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
