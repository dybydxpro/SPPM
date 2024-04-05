import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { customer_id, name, mobile, email ,review } = req.body;
        console.log(req.body);
        const service_review = await prisma.service_reviews.create({
            data: {
                customer_id: customer_id,
                name: name,
                mobile: mobile,
                email: email,
                review: Number(review),
            },
        });
        res.send(service_review);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});


router.get("/", async (req: Request, res: Response) => {
    try {
        const service_review = await prisma.service_reviews.findMany(
            {
                orderBy: {
                    id: 'asc'
                }
            }
        );
        res.send(service_review);
    } catch (error) {
        res.status(500).send(error)
    }
});


router.get("/bynum", async (req: Request, res: Response) => {
    try {
        const {mobile} = req.body ;
        const service_review = await prisma.service_reviews.findFirst(
            {
                where: {
                    mobile : mobile ,
                },
                orderBy: {
                    id: 'asc'
                }
            }
        );
        res.send(service_review);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post("/byid", async (req: Request, res: Response) => {
    try {
        const { customer_id , startDate , endDate } = req.body;
        // console.log(req.body) ;
        const supplierPayments = await prisma.service_reviews.findMany(
            {
                where : {
                    customer_id : customer_id,
                    createdAt : {
                        lte : new Date(endDate),
                        gte : new Date(startDate),
                    },
                },
                orderBy: {
                    createdAt : 'desc'
                }
            }
        );
        res.send(supplierPayments);

    } catch (error) {
        res.status(500).send(error)
    }

});


export default router