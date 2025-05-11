routes.post("/login", async (req, res) => {
	const { username, password, flag } = req.body;
  
	// Simple mock authentication
	if (username === "admin" && password === "password" && flag === true) {
	  return res.json({ code: 0, message: "Login successful" });
	} else {
	  return res.status(401).json({ code: 1, message: "Invalid credentials" });
	}
  });
  