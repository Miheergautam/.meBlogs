import { Hono } from "hono";
import authFunctions from "../../controllers/authController";
import { googleAuth } from "@hono/oauth-providers/google";
import { sign } from 'hono/jwt'


type AppBindings = {
  Bindings: {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
    JWT_SECRET: string;
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

  const appToken = await sign(
    {
      sub: user.email,
      name: user.name,
      picture: user.picture,
    },
    c.env.JWT_SECRET
  )

  return c.json({
    token: appToken,
    user,
    googleToken: tokenData,
  })
})



export default authRouter;
