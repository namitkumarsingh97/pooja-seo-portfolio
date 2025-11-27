import serverless from "serverless-http";
import app from "../server/index.js";
import { connectDB } from "../server/src/config/db.js";

let isDBConnected = false;

async function initDB() {
  if (!isDBConnected) {
    await connectDB();
    isDBConnected = true;
  }
}
await initDB();

export default serverless(app);
