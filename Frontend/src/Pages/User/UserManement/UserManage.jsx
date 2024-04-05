import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import { serverUrl } from '../../../Config';


export default function UserManage() {
  const [adduser, setUser] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/user`)
      .then(res => {
        // console.log(res)
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <>
    <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <Link to={'/adduser'}>
              <button className="btn btn-secondary">Add User</button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
              <table className="table table-striped table-dark">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">User Level</th>
                    <th scope="col">Date of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    adduser.map(getb => (
                      <tr key={getb.id}>
                        <td>{getb.user_id}</td>
                        <td>{getb.name}</td>
                        <td>{getb.mobileNo}</td>
                        <td>{getb.email}</td>
                        <td>{getb.address}</td>
                        <td>{getb.userLevel}</td>
                        <td>{getb.DOB}</td>
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
