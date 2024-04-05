import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import ViewStock from "./Pages/Stock/ViewStock/ViewStock"
import AddStock from "./Pages/Stock/AddStock/AddStock"
import AddWarehouse from "./Pages/Stock/AddWarehouse/AddWarehouse"
import AddnewBatch from "./Pages/Stock/AddBatches/AddnewBatch"
import AddUser from "./Pages/User/AddUser/AddUser"
import AddSupplier from "./Pages/Supplier/AddSupplier/AddSupplier"
import AddToStock from "./Pages/Stock/StockTable/AddToStock"
import { Component } from "react"
import ViewSupplier from "./Pages/Supplier/ViewSupplier/ViewSupplier"
import AddGRN from "./Pages/Stock/AddGRN/AddGRN"
import ViewGRN from "./Pages/Stock/ViewGRN/ViewGRN"
import OutofStocks from "./Pages/Stock/OutofStock/OutofStock"
import AddBank from "./Pages/Bank/AddBank/AddBank"
import AddSupplierPayment from "./Pages/Supplier/AddSupplierPayments/AddSupplierPayment"
import UpdateStock from "./Pages/Stock/UpdateStock/UpdateStock"
import ExpiredBatch from "./Pages/Stock/ExpiredBatches/ExpiredfStock"
import ViewUser from "./Pages/User/ViewUser/ViewUser"
import UpdateSupplier from "./Pages/Supplier/UpdateSupplier/UpdateSupplier"
import UpdateUser from "./Pages/User/UpdateUser/UpdateUser"
import SupplierPaymentReport from "./Pages/Supplier/SupplierPaymentReport/SupplierPaymentReport"
import UserlogReport from "./Pages/User/UserLog/UserLogReport"
import AddUserReview from "./Pages/User/AddUserReviews/AddUserReview"
import ViewUserReview from "./Pages/User/ViewUserReview/ViewUserReview"
import ViewLeaveNote from "./Pages/User/ViewLeaveNote/ViewLeaveNote"
import AddLeaveNote from "./Pages/User/AddLeaveNote/AddLeaveNote"
import AddRequestNote from "./Pages/Supplier/AddRequestNote/AddRequestNote"
import ViewRequestNote from "./Pages/Supplier/ViewRequestNote/ViewRequestNote"
import AddCustomer from "./Pages/Customer/AddCustomer/AddCustomer"
import ViewCustomer from "./Pages/Customer/ViewCustomer/ViewCustomer"
import UpdateCustomer from "./Pages/Customer/UpdateCustomer/UpdateCustomer"
import AddServiceReview from "./Pages/Customer/ServiceReviews/AddServiceReviews"
import ServiceReviewReport from "./Pages/Customer/ServiceReviewReport/ServiceReviewReport"
import Bill from "./Pages/Sales/AddBill/Bill"
import ViewBill from "./Pages/Sales/AddBill/ViewBill"
import Print from "./Pages/Sales/AddBill/print"

export const routes = [
    {
        path: '/login',
        Component: <Login/>
    },
    {
        path: '/',
        Component: <Home/>
    },
    {
        path: '/stock',
        Component: <ViewStock/>
    },
    {
        path: '/addstock',
        Component: <AddStock/>
    },
    {
        path: '/addwarehouse',
        Component: <AddWarehouse/>
    },
    {
        path: '/addbatch',
        Component: <AddnewBatch/>
    },
    
    {
        path: '/adduser',
        Component: <AddUser/>
    },
    {
        path: '/addsupplier',
        Component: <AddSupplier/>
    },
    {
        path:'addtostock',
        Component:<AddToStock/>
    },
    {
        path:'/viewsupplier',
        Component: <ViewSupplier/>
    },
    {
        path:'/grn',
        Component: <AddGRN/>
    },
    {
        path:'/viewgrns',
        Component: <ViewGRN/>
    },
    {
        path:'/outofstock',
        Component: <OutofStocks/>
    },
    {
        path: '/addbank',
        Component:<AddBank/>
    },
    {
        path: '/addsupplierpayment',
        Component:<AddSupplierPayment/>
    },
    {
        path: '/updatestock/:bno',
        Component: <UpdateStock/>
    },
    {
        path: '/batchexpired',
        Component: <ExpiredBatch/>
    },
    {
        path: '/viewuser',
        Component: <ViewUser/>
    },
    {
        path: '/updatesupplier/:sid',
        Component: <UpdateSupplier/>
    },
    {
        path: '/updateuser/:uid',
        Component: <UpdateUser/>
    },
    {
        path: '/supplierpaymentreport',
        Component: <SupplierPaymentReport/>
    },
    {
        path: '/userlogreport',
        Component: <UserlogReport/>
    },
    {
        path: '/adduserreview',
        Component: <AddUserReview/>
    },
    {
        path: '/viewuserreview',
        Component: <ViewUserReview/>
    },
    {
        path: '/viewLeaveNote',
        Component: <ViewLeaveNote/>
    },
    {
        path: '/addleavenote',
        Component: <AddLeaveNote/>
    },
    {
        path: '/addrequestnote',
        Component: <AddRequestNote/>
    },
    {
        path: '/viewrequestnote',
        Component: <ViewRequestNote/>
    },
    {
        path: '/addcustomer',
        Component: <AddCustomer/>
    },
    {
        path: '/updatecustomer/:cid',
        Component: <UpdateCustomer/>
    },
    {
        path: '/viewcustomer',
        Component: <ViewCustomer/>
    },
    {
        path: '/addservicereview/:cid',
        Component: <AddServiceReview/>
    },
    {
        path: '/servicereviewreport',
        Component: <ServiceReviewReport/>
    },
    {
        path: '/bill',
        Component: <Bill/>
    },
    {
        path: '/viewbill',
        Component: <ViewBill/>
    },
    {
        path: '/print/:saleId',
        Component: <Print/>
    },

]