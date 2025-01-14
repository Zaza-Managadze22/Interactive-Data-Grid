import express from "express";
import cors from "cors";
import router from "./routes"; // Adjust the import path as necessary

const app = express();
const PORT = 8080;

// Configure CORS to allow requests from http://localhost:3030
app.use(
  cors({
    origin: "http://localhost:3030",
  })
);

app.use(express.json());

// Use the router for API endpoints
app.use(router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
