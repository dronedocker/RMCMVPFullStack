import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/hello", (req, res) => {
  res.json({ status: "ok", message: "Hello from ReadyMonitor Cloud backend!" });
});

// 🔐 Mock login route
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  const mockUser = {
    email: "test@example.com",
    password: "password123",
  };

  if (username === mockUser.email && password === mockUser.password) {
    return res.json({
      code: 0,
      message: "Success",
      data: {
        token: "mock-jwt-token",
        user: { email: username },
      },
    });
  }

  return res.status(401).json({
    code: 401,
    message: "Invalid credentials",
  });
});

export default app;