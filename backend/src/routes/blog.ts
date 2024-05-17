import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { CreateBlogInput, createBlogInput } from "@tusharshah/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: String;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try{
    const user = await verify(authHeader, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id);
    await next();
  } else {
    console.log(c);
    c.status(403);
    return c.json({
      message: "You are not logged in!",
    });
  }
  }catch(e){
    c.status(403);
    return c.json({
      message: "You are not logged in!",
    });
  }
});

// Create the data for the blog
blogRouter.post("/", async (c) => {
  const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

	const post = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(userId)
		}
	});
	return c.json({
		id: post.id
	});
})


// Update the data for the blog

blogRouter.put("/", async (c) => {
  // const userId = c.get('userId');
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
      // authorId: userId
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const blogs = await prisma.blog.findMany({
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
  
    return c.json({ blogs });
  });


blogRouter.get("/:id", async (c) => {
  // const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog=await prisma.blog.findFirst({
      where: {
        id: Number(id),
        // authorId: userId
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true,
          }
        }
      }
    })
    return c.json({blog});
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post.",
    });
  }
});


