// app.js
import express from "express";
import { validateVehicle } from "./middleware/validateVehicle.ts";
import * as vehicleController from "./controllers/vehicleController.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { AppError } from "./utils/AppError.ts";

export const app = express();
app.use(express.json());

// AFFÄRSLOGIK 2: Lägg till en route GET /api/vehicles/classics som returnerar alla fordon byggda före 1980. Definiera år-gränsen som en konstant CLASSIC_YEAR = 1980 i stället för att hårdkoda den i SQL-frågan.
app.get("/api/vehicles/classics", vehicleController.getClassics);

// ROUTES 4: Lägg till filtrering med query parametern make på GET /api/vehicles, t.ex. /api/vehicles?make=volvo
// ROUTES 5: Utöka filtreringen med ytterligare två query parametrar: color och year. Alla tre ska kunna kombineras, t.ex. /api/vehicles?make=volvo&color=silver&year=2015
// ROUTES 6: Lägg till sortering via query parametern sort på GET /api/vehicles. Tillåtna värden är make, year och color. Standardsortering är make. Returnera 400 om ett ogiltigt sorteringsfält skickas med.
app.get("/api/vehicles", vehicleController.getAllVehicles);

// ROUTES 1: Lägg till en route GET /api/vehicles/:id som returnerar ett specifikt fordon. Returnera 404 om det inte hittas och 400 om id inte är ett giltigt heltal.
app.get("/api/vehicles/:id", vehicleController.getVehiclesById);

// Writing Routes (with validation middleware)
// POST /api/vehicles
app.post("/api/vehicles", validateVehicle, vehicleController.createVehicle);

// ROUTES 3: Lägg till en route PUT /api/vehicles/:id som ersätter ett fordon helt. Återanvänd samma validering som i POST.
app.put("/api/vehicles/:id", validateVehicle, vehicleController.updateVehicle);

// ROUTES 2: Lägg till en route DELETE /api/vehicles/:id som tar bort ett fordon och returnerar det borttagna objektet.
app.delete("/api/vehicles/:id", vehicleController.deleteVehicle);

// "404 Page Not Found" (Catch-all)
app.use((req, res, next) => {
  // Use next() with AppError so the central errorHandler manages it
  next(new AppError(`Sidan ${req.originalUrl} hittades inte.`, 404));
});

// Error Middleware (Always at the end)
app.use(errorHandler);

export default app;
