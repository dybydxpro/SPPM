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

export default function ViewRequestNote() {

  const ref=useRef()
      
  const [requestnote, setrequestnote] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');

  const fetchrequestnote = () => {
    axios
      .get(`${serverUrl}/supplierrequestnote`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setrequestnote(res.data)
        setfilterdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchrequestnote()
  }, [])

//-----------------------------------search-------------------------------
const filter=(event)=>{
  const getsearch=event.target.value;
  setquery(getsearch);
  // console.log(getsearch);
  if(getsearch.length>0){
    const searchdata=requestnote.filter((item)=>item.requestId.toLowerCase().includes(getsearch));
    setrequestnote(searchdata);
  }else
  {
    setrequestnote(filterdata);
  }
}


  return (
    <>
      <Navbar />
      <div className="container mt-3" >
      <h1 className="my-4 font-weight-bold-display-4" style={{ backgroundColor: "17BFBA", color: "white" ,marginTop:50,padding:5}}>View Request Notes</h1>
        <div>
          {/* ------------------------------Search----------------------------------------------------------------- */}
        <div className="row">
          <h2 style={{ marginTop: 30, marginBottom: 10, backgroundColor: "green", color: "white", width: 220, padding: 5 }}>Search Request<HiIcons.HiSearchCircle /></h2>
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
                  <th scope="col">Request ID</th>
                  <th scope="col">Supplier ID</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Requested Quantity</th>
                  <th scope="col">Requested Date</th>
                  <th scope="col">Request Sent Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  requestnote.map(getr => (
                    <tr key={getr.id}>
                      <td>{getr.requestId}</td>
                      <td>{getr.supplierId}</td>
                      <td>{getr.supplierName}</td>
                      <td>{getr.productId}</td>
                      <td>{getr.productName}</td>
                      <td>{getr.quantity}</td>
                      <td>{getr.date}</td>
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
          documentTitle='Print Request Notes'
          pageStyle="print"
          />
          <Link to={'/viewsupplier'}>
                        <button className="back">Back</button>
                      </Link>
         </div>
         </div>
      </div>
    </>
  );
};
