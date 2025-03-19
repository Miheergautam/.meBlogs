import { Hono } from "hono";
import { cors } from "hono/cors";
import mainRoute from "./routes/mainRoute";

const app = new Hono();

app.use(cors());
app.route("/api/v1", mainRoute);

export default app;