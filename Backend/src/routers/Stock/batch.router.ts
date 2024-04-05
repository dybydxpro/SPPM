import express, { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
import { authenticatoken } from '../../helper';
const router = Router()
const prisma = new PrismaClient();

router.use(authenticatoken)
router.post("/", async (req: Request, res: Response) => {
    try {
        const { productId, batchNo, ManufacturerBNo, mfDate, exDate, buyingPrice, sellingPrice } = req.body;
        const batch = await prisma.batchNo.create({
            data: {
                productId: productId,
                batchNo: batchNo,
                ManufacturerBNo: ManufacturerBNo,
                mfDate: new Date(mfDate),
                exDate: new Date(exDate),
                buyingPrice: Number(buyingPrice),
                sellingPrice: Number(sellingPrice),
            },
        });
        res.send(batch);
    } catch (error) {
        console.log({ error });

        res.status(500).send(error)
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const batches = await prisma.batchNo.findMany(
            {
                where: {
                    status: 'active',
                },
                orderBy: {
                    productId: 'asc'
                }
            }
        );
        res.send(batches);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/expired", async (req: Request, res: Response) => {
    try {
        const batches = await prisma.batchNo.findMany(
            {
                where: {
                    status: 'active',
                    exDate:{
                        lte:new Date(), 
                    },
                },
                orderBy: {
                    productId: 'asc'
                }
            }
        );
        res.send(batches);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/byid/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
            const batches = await prisma.batchNo.findMany(
                {
                    where: {
                        productId: id,
                        status: 'active',
                    }
                }
            ); 
            res.send(batches);
        }catch (error) {
        res.status(500).send(error)
    }
});

router.get("/batchno/:batchNo", async (req: Request, res: Response) => {
    try {
        const batchNo = req.params.batchNo;
            const batches = await prisma.batchNo.findUnique(
                {
                    where: {
                        batchNo:batchNo
                    }
                }
            ); 
            res.send(batches);

        }catch (error) {
        res.status(500).send(error)
    }
});

router.put("/", async (req: Request, res: Response) => {
    try {
        const { productId, batchNo, ManufacturerBNo, mfDate, exDate, buyingPrice, sellingPrice } = req.body;
        const updatebatch = await prisma.batchNo.update({
            where: {
                batchNo: batchNo
            },
            data: {
                productId: productId,
                ManufacturerBNo: ManufacturerBNo,
                mfDate: new Date(mfDate),
                exDate: new Date(exDate),
                buyingPrice: buyingPrice,
                sellingPrice: sellingPrice,
            }
        });
        res.send(updatebatch);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete("/:batchNo", async (req: Request, res: Response) => {
    try {
        const batchNo = req.params.batchNo;
        const deletebatch = await prisma.batchNo.update({
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