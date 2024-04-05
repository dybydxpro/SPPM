import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as AiIcons from "react-icons/ai";
import * as FaItems from "react-icons/fa";
import { serverUrl } from '../../../Config';
import { Center } from '@mantine/core';
import * as HiIcons from "react-icons/hi";
import * as GrIcons from "react-icons/gr";
import * as TbIcons from "react-icons/tb";


export default function ViewCustomer() {
  const ref = useRef()
  const [customer, setCustomer] = useState([]);
  const [remove, setdelete] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');

  const deleteCustomer = (customer_id) => {
    axios
      .delete(`${serverUrl}/customer/` + customer_id, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then((res) => {

        setdelete(res.data)

      })
      .catch((err) => console.log(err))
  }



  const fetch = () => {
    axios
      .get(`${serverUrl}/customer`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setCustomer(res.data)
        setfilterdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])

  //-----------------------------------search-------------------------------
  const filter = (event) => {
    const getsearch = event.target.value;
    setquery(getsearch);
    // console.log(getsearch);
    if (getsearch.length > 0) {
      const searchdata = customer.filter((item) => item.name.toLowerCase().includes(getsearch));
      setCustomer(searchdata);
    } else {
      setCustomer(filterdata);
    }
  }


  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="Auth-form-title1" style={{
          textAlign: Center,
          marginBottom: "10px",
          fontSize: "24px",
          color: 'white',
          padding: "5px",
          backgroundColor: '#17BFBA',
          fontWeight: 800,
          borderRadius: "10px"
        }}>
          <h1>Manage Customers</h1>
        </div>
        <div className="row">
          <div className="col">
            <Link to={'/addCustomer'}>
              <button className="btn btn-primary">Add New Customer&nbsp;<AiIcons.AiOutlineUsergroupAdd /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/servicereviewreport'}>
              <button className="btn btn-primary">Service Review Report&nbsp;<AiIcons.AiOutlineUsergroupAdd /></button>
            </Link>
          </div>
        </div>
        {/* ------------------------------Search----------------------------------------------------------------- */}
        <div className="row">
          <h2 style={{ marginTop: 30, marginBottom: 10, backgroundColor: "#17BFBA", color: "white", width: 270, padding: 5 }}>Search Customer<HiIcons.HiSearchCircle /></h2>
        </div>
        <div className="row">
          <input
            style={{ width: 500 }}
            type="text"
            className="form-control mt-1"
            placeholder="Search......"
            value={query}
            onChange={(e) => filter(e)}
          />
        </div>
        {/* //--------------------------------------------------------------------------------------------- */}
        <div className="row">
          <h2 style={{ backgroundColor: "#17BFBA", color: "white", marginTop: 30, width: 190, padding: 5 }}>Customer List</h2>
        </div>
        <div ref={ref} className="row">
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 5
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Customer ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">Customer Mobile Number</th>
                  <th scope="col">Customer Loyalty Points</th>
                  <th scope='col'>Edit</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  customer.map(gets => (
                    <tr key={gets.id}>
                      <td>{gets.customer_id}</td>
                      <td>{gets.name}</td>
                      <td>{gets.email}</td>
                      <td>{gets.mobile}</td>
                      <td>{gets.loyalty_points}</td>
                      <td>
                        <Link to={'/updatecustomer/' + gets.customer_id}>
                          <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                        </Link>
                      </td>
                      <td>
                        <Link to={'/viewCustomer'}>
                          <button className="btn btn-danger"
                            onClick={() => {
                              deleteCustomer(gets.customer_id)
                              window.alert('Customer Deleted Successfully')
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
    </>
  )
}
