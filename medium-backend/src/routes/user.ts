import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import {singupSchema, loginSchema} from '@nshnt777/medium-common-module'

// any request coming to '/api/v1/user' gets routed to this file
const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

// SIGNUP
userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {    
        const body = await c.req.json();
        
        const { success } = singupSchema.safeParse(body);

        if(!success){
            console.error("Error: Invalid inputs sent")
            c.status(411);
            return c.json({
                error: "Invalid Inputs"
            });
        }

        // zod, password hashing
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            JWT_token: token,
        });
    } catch (error: any) {
        console.error("Error: ", error.message);
        c.status(403);
        return c.json({
            error: "Error encoutered while creating user",
        });
    }
});

// LOGIN
userRouter.post("/login", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        const { success } = loginSchema.safeParse(body);
    
        if(!success){
            console.error("Error: Invalid inputs sent")
            c.status(411);
            return c.json({
                error: "Invalid Inputs"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
        });

        if (!existingUser) {
            c.status(403);
            return c.json({
                error: "User not found",
            });
        }

        const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);

        return c.json({
            name: existingUser.name,
            eamil: existingUser.email,
            JWT_token: token,
        });
    } catch (error: any) {
        console.error("Error: ", error.message);
        c.status(411);
        return c.json({
            error: "Some error occured while loging in",
        });
    }
});

//Get my details
userRouter.get("/me", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const token = c.req.header("authorization") || "";

    try {
        const verified = await verify(token, c.env.JWT_SECRET);
    
        if (!verified.id) {
            throw new Error("Invalid authorization token");
        }
        const userId = verified.id;

        // console.log(userId);

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        })

        console.log(user)
        return c.json({
            email: user?.email,
            name: user?.name
        })
    }
    catch (error: any) {
        c.status(401);
        console.error("Error in authorization: ", error.message);
        return c.json({
            error: "You are unauthorized"
        })
    }

})

export {userRouter};
