import { Hono } from "hono";
import { cors } from "hono/cors";
import mainRoute from "./routes/mainRoute";

const app = new Hono();

// Enable CORS
app.use(cors());

// Logging Middleware
app.use("*", async (c, next) => {
    console.log(`[Request] ${c.req.method} ${c.req.url}`);
    await next();
});

// Attach Routes
app.route("/api/v1", mainRoute);

// Error Handling
app.onError((err, c) => {
    console.error(`[Error] ${err.message}`);
    return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
