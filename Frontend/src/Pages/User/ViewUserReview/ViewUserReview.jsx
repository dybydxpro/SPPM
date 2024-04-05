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
export default function ViewUserReview() {

  const ref=useRef()
      
  const [userreview, setuserreview] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');
  const fetchuserreview = () => {
    axios
      .get(`${serverUrl}/userreview`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setuserreview(res.data)
        setfilterdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchuserreview()
  }, [])

//-----------------------------------search-------------------------------
const filter=(event)=>{
  const getsearch=event.target.value;
  setquery(getsearch);
  // console.log(getsearch);
  if(getsearch.length>0){
    const searchdata=userreview.filter((item)=>item.user_id.toLowerCase().includes(getsearch));
    setuserreview(searchdata);
  }else
  {
    setuserreview(filterdata);
  }
}


  return (
    <>
      <Navbar />
      <div className="container mt-3" >
      <h1 className="my-4 font-weight-bold-display-4">View User Reviews</h1>
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
                  <th scope="col">Rating</th>
                  <th scope="col">Description</th>
                  <th scope="col">Added Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  userreview.map(getr => (
                    <tr key={getr.id}>
                      <td>{getr.user_id}</td>
                      <td>{getr.name}</td>
                      <td>{getr.rating}</td>
                      <td>{getr.description}</td>
                      <td>{moment.utc(getr.createdAt).format('DD/MM/YYYY')}</td>
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
          documentTitle='Print Reviews'
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
