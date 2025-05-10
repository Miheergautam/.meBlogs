import { Hono } from "hono";
import authFunctions from "../../controllers/authController";
import { googleAuth } from "@hono/oauth-providers/google";
import { sign } from 'hono/jwt'
import { FrontendURL } from "../../URL";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


type AppBindings = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
  };
};

const authRouter = new Hono<AppBindings>();

authRouter.post("/login", authFunctions.userLogin);
authRouter.post("/register", authFunctions.userRegister);
authRouter.put("/update", authFunctions.updateUser);
authRouter.get("/get", authFunctions.getUser);

authRouter.use('/google/*', async (c, next) => {
  const config = {
    client_id: c.env.GOOGLE_CLIENT_ID,
    client_secret: c.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: c.env.GOOGLE_REDIRECT_URI,
    scope: ['openid', 'email', 'profile'],
  };
  return googleAuth(config)(c, next);
});

// This route redirects user to login
authRouter.get('/google', (c) => {
  return c.redirect('/google/login')
})

// Callback handler
authRouter.get('/google/callback', async (c) => {
  const user = c.get('user-google')
  const tokenData = c.get('token')

  if (!user) {
    return c.json({ error: 'User not found' }, 400)
  }

  if (!user?.email || !user?.name) {
    return c.json({ error: 'Invalid user data' }, 400)
  }

  console.log(user);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  let existingUser = await prisma.user.findUnique({
    where: { email: user.email }
  });


  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        profileImage: user.picture || null,
        provider:"google"
      }
    });
  }

  const appToken = await sign(
    {
      sub: existingUser.id,
      name: existingUser.name,
      picture: existingUser.profileImage,
    },
    c.env.JWT_SECRET
  )

  return c.redirect(`${FrontendURL}/oauth-success?token=${appToken}`);

});


export default authRouter;
