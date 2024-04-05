import React, { useEffect, useState} from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../../Config';



export default function ViewStock() {
  const [stock, setStock] = useState([]);
  const fetch = () => {
    axios
      .get(`${serverUrl}/stock/outofstock/`,{
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
           <h1 style={{ backgroundColor: "blue", color: "white" ,marginTop:50,padding:5}}>Out Of Stock List</h1>
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
                    <th scope="col">Warehouse</th>
                    <th scope="col">Batch Number</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Buying Price (Rs.)</th>
                    <th scope="col">Selling Price (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    stock.map(getb => (
                      <tr key={getb.id}>
                       <td>{getb.productId}</td>
                        <td>{getb.warehouseID}</td>
                        <td>{getb.batchNo}</td>
                        <td>{getb.quantity}</td>
                        <td>{getb.buyingPrice}</td>
                        <td>{getb.sellingPrice}</td>
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
