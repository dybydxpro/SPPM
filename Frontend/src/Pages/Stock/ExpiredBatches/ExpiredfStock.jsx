import React, { useEffect, useState} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../../Config';
import moment from "moment"



export default function ViewStock() {
  const [stock, setStock] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/batches/expired/`,{
        headers:{
          "authorization":localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setStock(res.data)
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
           <h1 style={{ backgroundColor: "blue", color: "white" ,marginTop:50,padding:5}}>Expired Batches In Stock</h1>
          </div>
        </div>
        <div className="row">
          <div className="col md-7" style={{
            height: 450,
            overflowY: 'scroll',
            marginTop: 20
          }}>
              <table className="table table-striped table-dark">
                <thead className="thead-light">
                  <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Batch Number</th>
                  <th scope="col">Manufacture Date</th>
                  <th scope="col">Expire Date</th>
                  <th scope="col">Buying Price</th>
                  <th scope="col">Selling Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    stock.map(getbatch => (
                      <tr key={getbatch.id}>
                       <td>{getbatch.productId}</td>
                      <td>{getbatch.batchNo}</td>
                      <td>{moment.utc(getbatch.mfDate).format('DD/MM/YYYY')}</td>
                      <td>{moment.utc(getbatch.exDate).format('DD/MM/YYYY')}</td>
                      <td>{getbatch.buyingPrice}</td>
                      <td>{getbatch.sellingPrice}</td>
                      </tr>
                    ))
                  }

                </tbody>
              </table> 
          </div>
        </div>
        <div className="row">
        <div className="col">
            <Link to={'/stock'}>
              <button className='btn btn-danger mx-auto'>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
