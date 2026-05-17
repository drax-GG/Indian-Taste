import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Table Reservations
  app.post("/api/reservations", (req, res) => {
    const { name, date, time, guests, phone } = req.body;
    
    // In a real app, this would save to a database.
    // For now, we'll just log it and return success.
    console.log("New Reservation:", { name, date, time, guests, phone });
    
    if (!name || !date || !time || !guests || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    res.json({ 
      success: true, 
      message: `Reservation confirmed for ${name} on ${date} at ${time}. We look forward to serving you!` 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
