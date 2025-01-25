import { Hono } from "hono";
import mainRoute from "./routes/mainRoute";

const app = new Hono();

app.route("/api/v1", mainRoute);

export default app;

//postgresql://neondb_owner:npg_Bi2QOFnMZw6W@ep-noisy-rice-a4e2jjm1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
