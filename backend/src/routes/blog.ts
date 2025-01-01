import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPostInput , updatePostInput} from '@sherixx/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || '';
    try{
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {        
        c.set("userId",String(user.id) ); 
        await next();
    }
    else {
        c.status(403);
        return c.json({
            error: "You are not logged in"
        })
    }
}catch(e){
    c.status(403);
    return c.json({
        error:"You are not logged in"
    })
}
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid inputs"
        })
    }
    const authorId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(403);
        return c.json({
            error: "Invalid inputs"
        });
    }
})
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid inputs"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(403);
        return c.json({
            error: "Invalid inputs"
        })
    }

})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blogs = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                }
            }
            }
        });
        return c.json({
            blogs
        })
    } catch (e) {
        c.status(411);
        return c.json({
            error: "Error fetching blog posts"
        })
    }

})

blogRouter.get('/:id', async (c) => {
    const id = await c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id),
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }

            }
        })
        return c.json({
            blog
        })
    } catch (e) {
        c.status(411);
        return c.json({
            error: "Error while fetching a blog post"
        })
    }
})





