import { Hono } from "hono";
import mainRoute from "./routes/mainRoute";

const app = new Hono();

app.route("/api/v1", mainRoute);

export default app;