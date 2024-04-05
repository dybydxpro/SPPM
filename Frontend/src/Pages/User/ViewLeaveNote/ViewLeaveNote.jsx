import React, { useState , useRef } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { serverUrl } from '../../../Config';
import { useEffect } from "react";
import axios from "axios";
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import moment from "moment"
import * as HiIcons from "react-icons/hi";

export default function ViewLeaveNote() {

  const ref=useRef()
      
  const [leavenote, setleavenote] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');

  const fetchleavenote = () => {
    axios
      .get(`${serverUrl}/leavenote`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setleavenote(res.data)
        setfilterdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchleavenote()
  }, [])

//-----------------------------------search-------------------------------
const filter=(event)=>{
  const getsearch=event.target.value;
  setquery(getsearch);
  // console.log(getsearch);
  if(getsearch.length>0){
    const searchdata=leavenote.filter((item)=>item.user_id.toLowerCase().includes(getsearch));
    setleavenote(searchdata);
  }else
  {
    setleavenote(filterdata);
  }
}


  return (
    <>
      <Navbar />
      <div className="container mt-3" >
      <h1 className="my-4 font-weight-bold-display-4">View Leave Note</h1>
        <div>
          {/* ------------------------------Search----------------------------------------------------------------- */}
        <div className="row">
          <h2 style={{ marginTop: 30, marginBottom: 10, backgroundColor: "green", color: "white", width: 220, padding: 5 }}>Search User<HiIcons.HiSearchCircle /></h2>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Search......"
            value={query}
            onChange={(e) => filter(e)}
          />
        </div>
        {/* //--------------------------------------------------------------------------------------------- */}

        <div className="row">
        <div ref = {ref} className="col md-7" style={{
            height: '100%',
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Leave Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Submitted Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  leavenote.map(getl => (
                    <tr key={getl.id}>
                      <td>{getl.user_id}</td>
                      <td>{getl.name}</td>
                      <td>{getl.date}</td>
                      <td>{getl.reason}</td>
                      <td>{moment.utc(getl.createdAt).format('DD/MM/YYYY')}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
        <div className="col">
         <ReactToPrint
          trigger={()=><button className='btn btn-primary mx-auto'>Print</button>}
          content={()=>ref.current}
          documentTitle='Print Leave Notes'
          pageStyle="print"
          />
          <Link to={'/viewuser'}>
                        <button className="back">Back</button>
                      </Link>
         </div>
         </div>
      </div>
    </>
  );
};
