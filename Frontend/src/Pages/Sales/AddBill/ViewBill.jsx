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
import SaleLinesTable from "./saleLinesTable";

export default function ViewBill () {

  const ref=useRef()
      
  const [header, setHeader] = useState([]);
  const [lines, setLines] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');
  const [selectedSaleId, setSelectedSaleId] = useState(''); 

  const fetchHeader = () => {
    axios
      .get(`${serverUrl}/sale`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setHeader(res.data)
        setfilterdata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchLines = (saleId) => {
    console.log(saleId);
    axios
      .post(`${serverUrl}/sale/getlines`, {saleId}, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setLines(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchHeader()
  }, [])

  //-----------------------------------search-------------------------------
  const filter=(event)=>{
    const getsearch=event.target.value;
    setquery(getsearch);
    if(getsearch.length>0){
      const searchdata=header.filter((item)=>item.saleId.toLowerCase().includes(getsearch));
      setHeader(searchdata);
    } else {
      setHeader(filterdata);
    }
  }

  // Function to handle opening popup/modal
  const openPopup = (saleId) => {
    console.log(saleId);
    setSelectedSaleId(saleId);
    fetchLines(saleId)
  }

  

  const closeModal = () => {
    setSelectedSaleId(null);
    setLines([]);
  }

  return (
    <>
      <Navbar />
      <div className="container mt-3" >
      <h1 className="my-4 font-weight-bold-display-4" style={{ backgroundColor: "17BFBA", color: "black" ,marginTop:50,padding:5}}>View Bill History</h1>
        <div>
          {/* ------------------------------Search----------------------------------------------------------------- */}
          <div className="row">
            <h2 style={{ marginTop: 30, marginBottom: 10, backgroundColor: "green", color: "white", width: 220, padding: 5 }}>Search Bill<HiIcons.HiSearchCircle /></h2>
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
            <div ref={ref} className="col md-7" style={{ height: '100%', overflowY: 'scroll', marginTop: 105 }}>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Sales ID</th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Gross Amount</th>
                    <th scope="col">Discount</th>
                    <th scope="col">net Amount</th>
                    <th scope="col">Actions</th> {/* Add a new column for Actions */}
                  </tr>
                </thead>
                <tbody>
                  {
                    header.map(getr => (
                      <tr key={getr.id}>
                        <td>{getr.saleId}</td>
                        <td>{getr.customer_id}</td>
                        <td>{getr.gross}</td>
                        <td>{getr.discount}</td>
                        <td>{getr.net}</td>
                        <td>{moment.utc(getr.saleDate).format('DD/MM/YYYY')}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => {openPopup(getr.saleId) }}>View Details</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* Popup/Modal */}
          {selectedSaleId && (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Sale Details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setSelectedSaleId(null)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* Fetch and display salelines data based on selectedSaleId */}
                    {/* You can use another component to display salelines data */}
                    <SaleLinesTable saleLines={lines} />
                  </div>
                  {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedSaleId(null)}>Close</button>
                  </div> */}
                </div>
              </div>
            </div>
          )}

          <ReactToPrint
            trigger={() => <button className='btn btn-primary mx-auto'>Print</button>}
            content={() => ref.current}
            documentTitle='Sales Header Print'
            pageStyle="print"
          />
          <Link to={'/viewsupplier'}>
            <button className="back">Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
