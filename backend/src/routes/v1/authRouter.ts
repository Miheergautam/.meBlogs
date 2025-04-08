import { Hono } from "hono";
import authFunctions from "../../controllers/authController";
import { Context } from "hono";
import { googleAuth } from "@hono/oauth-providers/google";

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

/* // Step 1: Redirect user to Google login
authRouter.get("/google", (c: Context<AppBindings>) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${c.env.GOOGLE_CLIENT_ID}&redirect_uri=${c.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;

  return c.redirect(authUrl);
});

// STEP 2: Handle Google callback and exchange code for user info
authRouter.get("/google/callback", async (c, next) => {
  try {
    const authMiddleware = googleAuth({
      client_id: c.env.GOOGLE_CLIENT_ID,
      client_secret: c.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: c.env.GOOGLE_REDIRECT_URI, // Required for OAuth flow
      scope: ["openid", "email", "profile"],
    });

    // Run the middleware to get auth details
    await authMiddleware(c, next);

    // Now retrieve the authenticated user info
    const token = c.get("token");
    const user = c.get("user-google");

    if (!user) {
      return c.json({ error: "Authentication failed" }, 401);
    }

    return c.json({
      token,
      user,
    });
  } catch (error) {
    console.error("OAuth Error:", error);
    return c.json({ error: "OAuth authentication failed" }, 500);
  }
}); */

export default authRouter;
