import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogSchema, updateBlogSchema } from '@nshnt777/medium-common-module'

// any request coming to '/api/v1/blog' gets routed to this file
const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const token = c.req.header("authorization") || "";

    try {
        const verified = await verify(token, c.env.JWT_SECRET);

        if (!verified.id) {
            throw new Error("Invalid authorization token");
        }

        c.set('userId', verified.id);

        await next();
    }
    catch (error: any) {
        c.status(401);
        console.error("Error in authorization: ", error.message);
        return c.json({
            error: "You are unauthorized"
        })
    }
})

// post a blog
blogRouter.post('/publish', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const userId = c.get('userId');

        const { success } = createBlogSchema.safeParse(body);

        if (!success) {
            console.error("Error: Invalid inputs sent")
            c.status(400);
            return c.json({
                error: "Invalid Inputs"
            });
        }

        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })

        return c.json({
            message: "Posted blog successfully",
            post: blog.id
        });
    }
    catch (error: any) {
        console.error("Error encountered while posting blog: ", error.message);
        c.status(411);
        return c.json({
            error: "Error occured while posting blog"
        })
    }
})

// update the blog
blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        const { success } = updateBlogSchema.safeParse(body);

        if (!success) {
            console.error("Error: Invalid inputs sent")
            c.status(400);
            return c.json({
                error: "Invalid Inputs"
            });
        }

        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            message: "Updated the blog successfully",
            post: blog.id
        });
    }
    catch (error: any) {
        console.error("Error encountered while posting blog: ", error.message);
        c.status(411);
        return c.json({
            error: "Error occured while updating the blog"
        })
    }
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // add pagination
        const allBlogs = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blogs: allBlogs
        })
    } catch (error: any) {
        console.error("Error while fetching blogs: ", error.message);
        c.status(411);
        return c.json({
            error: "Error while fetching blogs"
        })
    }
})

blogRouter.get('/myblogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = c.get('userId');

        const myBlogs = await prisma.post.findMany({
            where: {
                author: {
                    id: userId
                }
            },
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blogs: myBlogs
        });
    }
    catch (error: any) {
        console.error("Error encountered while getting your blogs: ", error.message);
        c.status(411);
        return c.json({
            error: "Error occured while getting your blog"
        })
    }
})


blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');

        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog: blog
        });
    }
    catch (error: any) {
        console.error("Error while fetching the blog: ", error.message);
        c.status(411);
        return c.json({
            error: "Error while fetching the blog"
        })
    }
})

blogRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const postId = c.req.param('id');

        const deletePost = await prisma.post.delete({
            where: {
                id: postId
            }
        })
        
        return c.json({
            message: "Successfullly deleted your blog!",
            success: true
        })
    }
    catch (error: any) {
        console.error("Error encountered while deleting blog: ", error.message);
        c.status(411);
        return c.json({
            error: "Error encountered while deleting blog"
        })
    }
})

export { blogRouter };
