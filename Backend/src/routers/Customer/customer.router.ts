import { Request, Response, Router } from 'express';
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();


router.post("/", async (req: Request, res: Response) => {
    try {
        const { customer_id, name, mobile, email } = req.body;
        console.log(req.body);
        const customer = await prisma.customer.create({
            data: {
                customer_id: customer_id,
                name: name,
                mobile: mobile,
                email: email,
            },
        });
        res.send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get("/", async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany(
            {
                where: {
                    status : 'active',
                },
                orderBy: {
                    id: 'asc'
                }
            }
        );
        res.send(customers);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/byid", async (req: Request, res: Response) => {
    try {
        const {customer_id} = req.body ;
        console.log(req.body)
        const customers = await prisma.customer.findFirst(
            {
                where: {
                    customer_id : customer_id ,
                    status : 'active',
                },
                orderBy: {
                    id: 'asc'
                }
            }
        );
        res.send(customers);
    } catch (error) {
        res.status(500).send(error)
    }
});


router.put("/", async (req: Request, res: Response) => {
    try {
        const { customer_id, name, mobile, loyalty_points, email } = req.body;
        const updatecustomer = await prisma.customer.update({
            where: { 
                customer_id: customer_id 
            },
            data: {
                name: name,
                mobile: mobile,
                loyalty_points: Number(loyalty_points),
                email: email,
            }
        });
        res.send(updatecustomer);
    } catch (error) {
        res.status(500).send(error)
    }
});


router.delete("/:customer_id", async (req: Request, res: Response) => {
    try {
        const customer_id = req.params.customer_id;
        const deactivateuser = await prisma.customer.update({
            where: {
                customer_id: customer_id
            },
            data: { 
                status: "deactive" 
            }
        });
        res.send(deactivateuser);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/bynum", async (req: Request, res: Response) => {
    try {
        const {mobile} = req.body ;
        const customers = await prisma.customer.findFirst(
            {
                where: {
                    mobile : mobile ,
                    status : 'active',
                },
                orderBy: {
                    id: 'asc'
                }
            }
        );
        res.send(customers);
    } catch (error) {
        res.status(500).send(error)
    }
});




export default router