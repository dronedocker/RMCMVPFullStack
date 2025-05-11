import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/hello", (req, res) => {
  res.json({ status: "ok", message: "Hello from ReadyMonitor Cloud backend!" });
});

// 🔐 Mock login route that matches frontend expectations
app.post("/api/auth/login", (req, res) => {
  const { username, password, flag } = req.body;

  const mockUser = {
    username: "test@example.com",
    password: "password123",
  };

  if (
    username === mockUser.username &&
    password === mockUser.password &&
    flag === true
  ) {
    return res.json({
      code: 0,
      message: "Success",
      data: {
        token: "mock-jwt-token",
        user: { username },
      },
    });
  }

  return res.status(401).json({
    code: 401,
    message: "Invalid credentials",
  });
});

// ✅ NEW: Mock workspace route to satisfy frontend request
app.get("/manage/api/v1/workspaces/current", (req, res) => {
  res.json({
    id: "mock-workspace-id",
    name: "Demo Workspace",
    platformName: "ReadyMonitor",
    description: "This is a test workspace",
  });
});

export default app;
