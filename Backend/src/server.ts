import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import ProductRouter from './routers/Stock/product.router'
import WarehouseRouter from './routers/Stock/warehouse.router'
import BatchRouter from './routers/Stock/batch.router'
import StockRouter from './routers/Stock/stock.router'
import GrnRouter from './routers/Stock/grn.router'
import CustomerRouter from './routers/Customer/customer.router'
import SupplierRouter from './routers/Supplier/supplier.router' ;
import BankRouter from './routers/Bank/bank.router' ;
import SupplierPaymentRouter from './routers/Supplier/supplierpayment.router' ;
import UserRouter from './routers/User/user.router' ;
import UserReviewRouter from './routers/User/userreview.router'
import UserLeaveNote from './routers/User/userleavenote.router'
import SupplierRequestNote from './routers/Supplier/supplierrequestnote.router'
import SaleRouter from './routers/Sales/sales.router'
import ServiceReview from './routers/Customer/servicereviews.router'


const app = express()
app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));
const prisma =new PrismaClient();

app.use('/product', ProductRouter)
app.use('/warehouse', WarehouseRouter)
app.use('/batches', BatchRouter)
app.use('/stock',StockRouter)
app.use('/grn',GrnRouter)
app.use('/customer' , CustomerRouter)
app.use('/supplier', SupplierRouter)
app.use('/bank' , BankRouter)
app.use('/supplier_payments' , SupplierPaymentRouter)
app.use('/user',UserRouter)
app.use('/userreview', UserReviewRouter)
app.use('/leavenote' , UserLeaveNote )
app.use('/supplierrequestnote' , SupplierRequestNote)
app.use('/sale' , SaleRouter)
app.use('/servicereview' , ServiceReview)

app.listen(5000, () => {
    console.log("server running on port 5000")
})