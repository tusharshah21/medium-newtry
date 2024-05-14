import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode,verify, sign } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables:{
        userId:string;
    }
}>();


blogRouter.use("*/", async (c,next)=>{
    const authHeader = c.req.header("authorization")||"";
    const user=await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id);
        await next();
    }else{
        c.status(403);
        return c.json({
            message:"You are not logged in!"
        })
    }
})


// Create the data for the blog
blogRouter.post('/', async (c) => {
    const body=await c.req.json();
	const authorId = c.get("userId");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	// const body = await c.req.json();
	const blog = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId:Number(authorId)
		}
	});

	return c.json({
		id: blog.id
	});
})

// Update the data for the blog

blogRouter.put('/', async (c) => {
	// const userId = c.get('userId');
    const body= await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const blog = await c.req.json();
	prisma.blog.update({
		where: {
			id: body.id,
			// authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.json({
        id:blog.id
    });
});

blogRouter.get('/', async (c) => {
	// const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	try {
        const body = await c.req.json();
	prisma.blog.findFirst({
		where: {
			id: body.id,
			// authorId: userId
		},
	});
    }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post."
        });

    }

})


blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blogs = await prisma.blog.findMany({});

	return c.json({blogs});
})
