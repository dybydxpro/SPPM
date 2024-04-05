// import React from 'react'
// import Navbar from '../../../Components/Navbar'
// import "bootstrap/dist/css/bootstrap.min.css";
// import productImage from "../Assests/pro.png";
// import { Formik, Form } from 'formik';
// import TextFields from './TextFields';
// import * as Yup from 'yup';
// import './add.css'

// export default function AddStock() {
//   const validate = Yup.object({
//     productID: Yup.string().required('required'),
//     Quantity: Yup.string().required('required'),
//     Price: Yup.number().positive('Invalid Price').required('required').typeError('Invalid Input Type')
//   })
//   return (
//     <>
//       <Navbar />
//       <div className="container mt-3">
//         <div className="row">
//           <div className="col md-5">
//             <Formik
//               initialValues={{
//                 productID: '',
//                 Price: '',
//                 Quantity: ''
//               }}
//               validationSchema={validate}
//             >
//               {formik => (
//                 <div>
//                   <h1 className="my-4 font-weight-bold-display-4">Add Products</h1>
//                   <Form>
//                     <TextFields label="Product ID" name="productID" type="text" />
//                     <TextFields label="Price" name="Price" type="text" />
//                     <TextFields label="Quantity" name="Quantity" type="text" />
//                     <button className="add">Add Product</button>
//                     <button className="reset" type='reset'>Reset</button>
//                     {/* <div></div> */}
//                   </Form>
//                 </div>
//               )}
//             </Formik>
//           </div>
//           <div className="col md-7 my-auto ">
//             <img className="img-fluid w-100" src={productImage} alt='' />
//           </div>
//         </div>
//       </div>


//     </>
//   )
// }
