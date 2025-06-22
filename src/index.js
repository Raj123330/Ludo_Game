import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import { app } from "./app.js";
import http from "http";
import { initializeSocket } from "./config/socket.js";
import "./cron/statusUpdate.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// Attach WebSocket to server
const io = initializeSocket(server);

(async () => {
  try {
    await sequelize.authenticate(); // Test DB connection
    console.log("✅ Database connection successful!");

    await sequelize.sync(); // Sync all models with DB
    console.log("✅ Database synced successfully");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Exit if DB fails
  }
})();

export { io };
