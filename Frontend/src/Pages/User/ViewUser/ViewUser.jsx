import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as FcItems from "react-icons/fc";
import { serverUrl } from '../../../Config';
import moment from "moment"
import { Center } from '@mantine/core';
export default function ViewUser() {
  const ref = useRef()
  const [user, setUser] = useState([]);
  const [remove, setdelete] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');

  const deleteUser = (user_id) => {
    axios
      .delete(`${serverUrl}/user/` + user_id, {
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
      .get(`${serverUrl}/user`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setUser(res.data)
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
      const searchdata = user.filter((item) => item.user_id.toLowerCase().includes(getsearch));
      setUser(searchdata);
    } else {
      setUser(filterdata);
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
          backgroundColor: 'green',
          fontWeight: 800,
          borderRadius: "10px"
        }}>
          <h1>User Manage</h1>
        </div>
        <div className="row">
          <div className="col">
            <Link to={'/adduser'}>
              <button className="btn btn-primary">Add New User&nbsp;<AiIcons.AiOutlineUserAdd /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/adduserreview'}>
              <button className="btn btn-primary">Add user Review&nbsp;<AiIcons.AiOutlineFundView /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/addleavenote'}>
              <button className="btn btn-warning">Add Leave Note&nbsp;<AiIcons.AiFillFolderAdd /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewleavenote'}>
              <button className="btn btn-warning">View Leave Notes&nbsp;<AiIcons.AiFillEye /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/viewuserreview'}>
              <button className="btn btn-warning">View User Reviews&nbsp;<FcItems.FcRating /></button>
            </Link>
          </div>
          <div className="col">
            <Link to={'/userlogreport'}>
              <button className="btn btn-danger">User Log Report&nbsp;<AiIcons.AiOutlineFileProtect /></button>
            </Link>
          </div>
        </div>
        {/* ------------------------------Search----------------------------------------------------------------- */}
        <div className="row">
          <h2 style={{ marginTop: 30, marginBottom: 10, backgroundColor: "green", color: "white", width: 220, padding: 5 }}>Search User<HiIcons.HiSearchCircle /></h2>
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
          <h2 style={{ backgroundColor: "green", color: "white", marginTop: 30, width: 140, padding: 5 }}>User List</h2>
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
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User Email</th>
                  <th scope="col">Mobile Number</th>
                  <th scope='col'>User Role</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Date Of Birth</th>
                  <th scope='col'>Edit</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  user.map(getu => (
                    <tr key={getu.id}>
                      <td>{getu.user_id}</td>
                      <td>{getu.name}</td>
                      <td>{getu.email}</td>
                      <td>{getu.mobileNo}</td>
                      <td>{getu.userLevel}</td>
                      <td>{getu.address}</td>
                      <td>{moment.utc(getu.DOB).format('DD/MM/YYYY')}</td>
                      <td>
                        <Link to={'/updateuser/' + getu.user_id}>
                          <button className="btn btn-primary"><AiIcons.AiTwotoneEdit /></button>
                        </Link>
                      </td>
                      <td>
                        <Link to={'/viewuser'}>
                          <button className="btn btn-danger"
                            onClick={() => {
                              deleteUser(getu.user_id)
                              window.alert('User Deleted Successfully')
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
