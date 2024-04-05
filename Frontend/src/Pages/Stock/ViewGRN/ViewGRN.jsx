import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import { serverUrl } from '../../../Config';
import * as HiIcons from "react-icons/hi";
import moment from "moment"

export default function ViewStock() {
  const ref=useRef()
  const [grn, setGrn] = useState([]);
  const [query, setquery] = useState('');
  const [filterdata, setfilterdata] = useState('');
  const fetch = () => {
    axios
      .get(`${serverUrl}/grn`,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setGrn(res.data)
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
const reset = () => {
  setquery('');
  fetch();
}

const filter=(event)=>{
  const getsearch=event.target.value;
  setquery(getsearch);
  // console.log(getsearch);
  if(getsearch.length>0){
    const searchdata=grn.filter((item)=>item.createdAt.toLowerCase().includes(getsearch));
    setGrn(searchdata);
  }else
  {
    setGrn(filterdata);
  }
}

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col">
           <h1>Goods Receive Notes</h1>
          </div>
        </div>
        <div className="row">
            <h2 style={{ marginTop: 30,marginRight:0,marginBottom:10, backgroundColor: "blue", color: "white",width:350,padding:5}}>Search GRNs By Date<HiIcons.HiSearchCircle/></h2>
          </div>
          <div className="rows">
          <input 
            style={{width:500,display:'inline'}}
              type="date"
              className="form-control mt-1"
              placeholder="Select a Date"
              value={query}
              onChange={(e)=>filter(e)}
            />
            <button className='btnreset' style={{
              width:100,
              marginLeft:20,
              borderRadius:8,
              borderStyle:'none',
              color:'white',
              background:'red',
              padding:"6px 0px"
            }} onClick={()=>{
              fetch()
            }}
            >Reset</button>
          </div>
        <div ref={ref} className="row">
          <div className="col md-7" style={{
            height: "100%",
            overflowY: 'scroll',
            marginTop: 50
          }}>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                  <th scope="col">GRN ID</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Warehouse ID</th>
                    <th scope="col">Supplier ID</th>
                    <th scope="col">Batch Number</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Buy (Rs.)</th>
                    <th scope="col">Added Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    grn.map(getb => (
                      <tr key={getb.id}>
                        <td>{getb.grnID}</td>
                        <td>{getb.productId}</td>
                        <td>{getb.warehouseID}</td>
                        <td>{getb.supplierID}</td>
                        <td>{getb.batchNo}</td>
                        <td>{getb.quantity}</td>
                        <td>{getb.totalBuyingPrice}</td>
                        <td>{moment.utc(getb.createdAt).format('DD/MM/YYYY')}</td>
                      </tr>
                    ))
                  }

                </tbody>
              </table> 
          </div>
        </div>
        <div className="row">
         <div className="col">
         <ReactToPrint
          trigger={()=><button className='btn btn-primary mx-auto'>Print</button>}
          content={()=>ref.current}
          documentTitle='New Goods Receive Note'
          pageStyle="print"
          />
         </div>
         <div className="col">
            <Link to={'/stock'}>
              <button className='btn btn-danger mx-auto'>Back</button>
            </Link>
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
          
          
        </div>
      </div>
    </>
  )
}
