// src/middleware/validateVehicle.js
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";

const MIN_YEAR = 1886;

// AFFÄRSLOGIK 1: Lägg till en regel att ett fordon inte kan ha ett year som är mer än ett år in i framtiden. Skriv valideringen som en egen funktion isValidYear(year).
const isValidYear = (year: number) => {
  const maxYear = new Date().getFullYear() + 1;
  return Number.isInteger(year) && year >= MIN_YEAR && year <= maxYear;
};

// VALIDERING & FELHANTERING 1: Lägg till validering som kontrollerar att color inte är längre än 30 tecken om det skickas med.
// VALIDERING & FELHANTERING 2: Lägg till hantering av ER_DUP_ENTRY i catch-blocket. Lägg till ett UNIQUE-index på make + model + year i tabellen och returnera ett tydligt felmeddelande om man försöker lägga till ett fordon som redan finns.
export const validateVehicle = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { make, model, year, color } = req.body;

  if (!make || !model || !year)
    return next(new AppError("make, model och year krävs.", 400));

  if (!isValidYear(year)) {
    const maxYear = new Date().getFullYear() + 1;
    return next(
      new AppError(
        `year måste vara ett giltigt heltal mellan ${MIN_YEAR} och ${maxYear}.`,
        400,
      ),
    );
  }

  if (color && color.length > 30)
    return next(new AppError("color får vara max 30 tecken.", 400));

  next(); // Todo bien, pasa al siguiente paso
};
