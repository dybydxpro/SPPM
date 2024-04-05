import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { FaStar } from 'react-icons/fa';
import './AddServiceReview.css'; 
import axios from 'axios';
import { serverUrl } from '../../../Config';


export default function AddServiceReview() {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [clickedStar, setClickedStar] = useState(0);
  const [customer, setCustomer] = useState([]);
  const {cid}=useParams();

  const data = {
    customer_id: cid
  };
  
  const fetch = () => {
    console.log(cid)
    axios
    .get(`${serverUrl}/customer/byid`, data, {
      headers: {
        "authorization": localStorage.getItem("token")
      },
    })
      .then(res => {
        setCustomer(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  axios.get(`${serverUrl}/customer/byid`, data)
  .then(response => {
    // Handle the response here
    console.log(response.data);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error fetching data:', error);
  });

  
  useEffect(() => {
    fetch()
  }, [])

  const handleHover = (index) => {
    setHoveredStar(index);
  };

  const handleClick = (index) => {
    setClickedStar(index);
  };

  

  const handleSubmit = (values) => {
    const formData = {
      customer_id: customer.customer_id,
      name: customer.name,
      mobile: customer.mobile,
      email: customer.email,
      review: parseInt(clickedStar),
    };
    axios
      .post(`${serverUrl}/servicereview/` , formData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err))
  };

  const initialValues = {
    customer_id: customer.customer_id,
    name: customer.name,
    mobile: customer.mobile,
    email: customer.email,
    review: 0,
  };

  return (
    <div>
      <h1 className="review-header">Add Service Review</h1>
      <div className="customer-info">
        <p>Customer Information:</p>
        <p>Customer ID: {initialValues.customer_id}</p>
        <p>Customer Name: {initialValues.name}</p>
        <p>Mobile No: {initialValues.mobile}</p>
        <p>Email: {initialValues.email}</p>
      </div>
      
      
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className='customer-info'>
            <p>Please rate our store:</p>
            </div>
            <div className="star-review-container">
              {[1, 2, 3, 4, 5].map((review) => (
                <div key={review} className="star-container">
                  <Field
                    type="radio"
                    name="review"
                    value={review}
                    className="review-radio"
                    onChange={() => {
                      setFieldValue('review', review);
                      setClickedStar(review);
                    }}
                  />
                  <FaStar
                    className="star-icon"
                    style={{ color: (hoveredStar >= review || clickedStar >= review) ? '#FFD700' : '#CCCCCC' }}
                    onMouseEnter={() => handleHover(review)}
                    onMouseLeave={() => handleHover(0)}
                    onClick={() => handleClick(review)}
                  />
                </div>
              ))}
          
            <button type="submit" className='add'>Submit</button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};
