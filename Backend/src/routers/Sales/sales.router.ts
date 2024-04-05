import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';

const router = Router()
const prisma = new PrismaClient();
//router.use(authenticatoken)


router.post("/", async (req: Request, res: Response) => {
    try {
        const {  customerId, discount , gross , net  } = req.body;
        const saleId = Date.now().toString();
        console.log(saleId)
        console.log(req.body);

        const sale = await prisma.sale.create({
            data: {
                saleId : saleId ,
                customer_id : customerId,
                discount : Number(discount),
                gross : Number(gross),
                net : Number(net),
            },
        });
        res.send(saleId);
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

});

router.post("/test", async (req: Request, res: Response) => {
    try {
        console.log(req.body)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }

});

router.post("/lines/:saleId", async (req: Request, res: Response) => {
    try {
        const { saleId } = req.params;
        const { tempData } = req.body;
        console.log(tempData);

        // Check if tempData exists and is an array
        if (!Array.isArray(tempData)) {
            throw new Error('tempData is not an array');
        }

        // Construct array to hold promises for the transaction
        const transactionPromises = tempData.map(async (saleItem: any) => {
            try {
                const sale = await prisma.salelines.create({
                    data: {
                        saleId: String(saleId),
                        productId: saleItem.productId,
                        productName: saleItem.productName,
                        batchNo: saleItem.BatchNo,
                        quantity: saleItem.billingQty,
                        sellingPrice: saleItem.sellingPrice,
                        total: saleItem.billingQty * saleItem.sellingPrice
                    },
                });

                await prisma.stock.update({
                    where: {
                        batchNo: saleItem.BatchNo,
                    },
                    data: {
                        quantity: {
                            decrement: saleItem.billingQty,
                        },
                    },
                });

                return sale;
            } catch (error) {
                throw new Error(error);
            }
        });

        // Execute the transaction
        await Promise.all(transactionPromises);

        res.send("Sales data inserted successfully.");
    } catch (error) {
        res.status(400).send(error.message); // Send error response
    }
});




router.get("/", async (req: Request, res: Response) => {
    try {
        const sale = await prisma.sale.findMany(
            {
                orderBy:{
                    saleId:'asc'
                }
                
            }
        );
        res.send(sale);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.post("/byid", async (req: Request, res: Response) => {
    try {
        const {saleId} = req.body ;
        console.log("header ID is",saleId)
        const sale = await prisma.sale.findFirst(
            {
                where: {
                    saleId:saleId
                }
            }
        );
        res.send(sale);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.post("/getlines", async (req: Request, res: Response) => {
    try {
        const {saleId} = req.body ;
        console.log("sales ID is : " , saleId)
        console.log(req.body);
        const salelines = await prisma.salelines.findMany(
            {
                where:{
                    saleId : saleId,
                },
                orderBy:{
                    productId:'asc'
                }
                
            }
        );
        res.send(salelines);

    } catch (error) {
        res.status(500).send(error)
    }

});


// router.delete("/:saleId", async (req: Request, res: Response) => {
//     try {
//         const saleId = req.params.saleId;
//         const deleteSale = await prisma.sale.update({
//             where: {
//                 saleId : saleId
//             },
//             data: {
//                 status: "deactive",
//             },
//         });
//         res.send(deleteSale);
//     } catch (error) {
//         res.status(500).send(error)
//     }
   
// });


export default router ;