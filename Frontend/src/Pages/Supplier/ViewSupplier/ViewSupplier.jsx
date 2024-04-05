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


export default function ViewSupplier() {
  const ref = useRef()
  const [supplier, setSupplier] = useState([]);
  const [remove, setdelete] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');

  const deleteSupplier = (supplierId) => {
    axios
      .delete(`${serverUrl}/supplier/` + supplierId, {
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
      .get(`${serverUrl}/supplier`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setSupplier(res.data)
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
      const searchdata = supplier.filter((item) => item.supplierName.toLowerCase().includes(getsearch));
      setSupplier(searchdata);
    } else {
      setSupplier(filterdata);
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
          <h1>Supplier Manage</h1>
        </div>
        <div className="row">
          <div className="col">
            <Link to={'/addsupplier'}>
              <button className="btn btn-primary">Add New Supplier&nbsp;<AiIcons.AiOutlineUsergroupAdd /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addsupplierpayment'}>
              <button className="btn btn-primary">Add Supplier Payments&nbsp;&nbsp;<FaItems.FaMoneyBillAlt /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addrequestnote'}>
              <button className="btn btn-primary">Add Request Note&nbsp;&nbsp;<GrIcons.GrNotes /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewrequestnote'}>
              <button className="btn btn-warning">View Request Note&nbsp;&nbsp;<GrIcons.GrNotes /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/supplierpaymentreport'}>
              <button className="btn btn-danger">Supplier Payment Report&nbsp;&nbsp;<TbIcons.TbReport /></button>
            </Link>
          </div>
        </div>
        {/* ------------------------------Search----------------------------------------------------------------- */}
        <div className="row">
          <h2 style={{ marginTop: 30, marginBottom: 10, backgroundColor: "#17BFBA", color: "white", width: 270, padding: 5 }}>Search Supplier<HiIcons.HiSearchCircle /></h2>
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
          <h2 style={{ backgroundColor: "#17BFBA", color: "white", marginTop: 30, width: 190, padding: 5 }}>Supplier List</h2>
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
                  <th scope="col">Supplier ID</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Supplier Email</th>
                  <th scope="col">Supplier Address</th>
                  <th scope="col">Supplier Contact Number</th>
                  <th scope='col'>Supplier Outstanding Amount</th>
                  <th scope='col'>Edit</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  supplier.map(gets => (
                    <tr key={gets.id}>
                      <td>{gets.supplierId}</td>
                      <td>{gets.supplierName}</td>
                      <td>{gets.supplierEmail}</td>
                      <td>{gets.supplierAddress}</td>
                      <td>{gets.supplierContactNumber}</td>
                      <td>{gets.outstandingAmount}</td>
                      <td>
                        <Link to={'/updatesupplier/' + gets.supplierId}>
                          <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                        </Link>
                      </td>
                      <td>
                        <Link to={'/viewsupplier'}>
                          <button className="btn btn-danger"
                            onClick={() => {
                              deleteSupplier(gets.supplierId)
                              window.alert('Supplier Deleted Successfully')
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
