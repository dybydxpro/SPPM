import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
const router = Router()
const prisma = new PrismaClient();
import { authenticatoken } from '../../helper';
import * as nodemailer from 'nodemailer'




//router.use(authenticatoken)

// router.post("/", async (req: Request, res: Response) => {
//     try {
//         const { productId,warehouseID, batchNo, quantity, buyingPrice, sellingPrice } = req.body;
//         const total=Number(buyingPrice)*Number(quantity);
//         const stock = await prisma.stock.create({
//             data: {
//                 productId: productId,
//                 warehouseID: warehouseID,
//                 batchNo: batchNo,
//                 quantity: Number(quantity),
//                 buyingPrice: Number(buyingPrice),
//                 sellingPrice: Number(sellingPrice),
//             },
//         });
//         res.send(stock);


//         const transporter =nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:'dealzsuperproject@gmail.com',
//                 pass:'rwsnwviflkvrpkfi'
//             }

//         })

//         transporter.sendMail({
//             from:'dealzsuperproject@gmail.com',
//             to:'amsenith.dilshan@gmail.com',
//             subject:productId,
//             text:'Product added to stock Sucessfully. \nQuantity='+quantity+'\nTotal Amount='+total ,
//         })

//     } catch (error) {
//         console.log({error});
        
//         res.status(500).send(error)
//     }
// });

router.post("/", async (req: Request, res: Response) => {
    try {
        const { productId, warehouseID, batchNo, quantity, buyingPrice, sellingPrice } = req.body;
        const existingStock = await prisma.stock.findUnique({
            where: {
                batchNo: batchNo
            }
        });

        if (existingStock) {
            // If stock with same batchNo exists, update the quantity
            const updatedStock = await prisma.stock.update({
                where: {
                    batchNo: batchNo
                },
                data: {
                    quantity: existingStock.quantity + Number(quantity)
                }
            });
            res.send(updatedStock);
        } else {
            // If stock with batchNo doesn't exist, create a new entry
            const total = Number(buyingPrice) * Number(quantity);
            const newStock = await prisma.stock.create({
                data: {
                    productId: productId,
                    warehouseID: warehouseID,
                    batchNo: batchNo,
                    quantity: Number(quantity),
                    buyingPrice: Number(buyingPrice),
                    sellingPrice: Number(sellingPrice),
                },
            });
            res.send(newStock);
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

router.get("/byid/:bid", async (req: Request, res: Response) => {
    try {
        const bid = req.params.bid;
            const stock = await prisma.stock.findFirst(
                {
                    where: {
                        batchNo: bid,
                        status: 'active',
                    }
                }
            ); 
            res.send(stock);
        }catch (error) {
        res.status(500).send(error)
    }
});


router.get("/loadstock", async (req: Request, res: Response) => {
    try {
        const stockload = await prisma.stock.findFirst(
            {
                where: {
                    status: 'active',
                },
                orderBy:{
                    id:'desc',
                },
                take:1,
            }
        );
        res.send(stockload);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error)
    }
});

router.get("/outofstock", async (req: Request, res: Response) => {
    try {
        const stocks = await prisma.stock.findMany(
            {
                where: {
                    status: 'active',
                    quantity:{
                        lt:20,
                    }
                },
                orderBy:{
                    productId:'asc'
                }
            }
        );
        res.send(stocks);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/search", async (req: Request, res: Response) => {
    try {
        const {productId}=req.body;
        const stocks = await prisma.stock.findMany(
            {
                where: {
                    status: 'active',
                    productId:{
                        startsWith:productId,
                    },
                },
                orderBy:{
                    productId:'asc'
                }
            }
        );
        res.send(stocks);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/setproduct/:pid", async (req: Request, res: Response) => {
    const productId=req.params.pid;
    console.log(productId);
    
    try {
        const stocks = await prisma.stock.findFirst(
            {
                where: {
                    status: 'active',
                    productId:productId,
                },
            }
        );
        res.send(stocks);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.put("/updatequantity" , async (req : Request , res: Response) => {
    try {
        const {batchNo,quantity} = req.body;
        // console.log(supplierID);
        // console.log(totalBuyingPrice);
        const addoutstanding = await prisma.stock.update({
            where: {
                batchNo:batchNo
            },
            data:{
                quantity:{
                    decrement:Number(quantity)
                }
            },
        });
        res.send(addoutstanding);
    }catch (error) {
        res.status(500).send(error)
    }
})



router.get("/", async (req: Request, res: Response) => {
    try {
        const stocks = await prisma.stock.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy:{
                    productId:'asc'
                }
            }
        );
        res.send(stocks);
    } catch (error) {
        res.status(500).send(error)
    }
});



router.put("/", async (req: Request, res: Response) => {
    try {
        const { batchNo,warehouseID, quantity} = req.body;
        const updatestock = await prisma.stock.update({
            where: {
                batchNo:batchNo
                
            },
            data: {
                batchNo:batchNo,
                warehouseID:warehouseID,
                quantity:{
                    increment:Number(quantity)},
            }
        });
        res.send(updatestock);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete("/:batchNo", async (req: Request, res: Response) => {
    try {
        const batchNo = req.params.batchNo;
        const deletebatch = await prisma.stock.update({
            where: {
                batchNo: batchNo
            },
            data: {
                status: "deactive",
            }
        });
        res.send(deletebatch);
    } catch (error) {
        res.status(500).send(error)
    }
});


export default router