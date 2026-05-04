// src/controllers/vehicleController.js
import { Request, Response, NextFunction } from "express";
import * as VehicleModel from "../models/vehicleModel.ts";
import { AppError } from "../utils/AppError.ts";
import { Vehicle } from "../types/index.ts";

const ALLOWED_SORT_FIELDS = ["make", "year", "color"];

export const getAllVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { make, color, year, sort } = req.query;

    if (sort && !ALLOWED_SORT_FIELDS.includes(sort as string)) {
      throw new AppError(
        `sort måste vara en av: ${ALLOWED_SORT_FIELDS.join(", ")}`,
        400,
      );
    }

// Dynamic filter
const filters: Partial<Vehicle> = {};
if (make) filters.make = make as string;
if (color) filters.color = color as string;
if (year) filters.year = Number(year);

    const rows = await VehicleModel.findAll(filters, (sort as string) ?? "make");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getClassics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await VehicleModel.findClassics(1980);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getVehiclesById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError("Ogiltigt id-format.", 400);

    const vehicle = await VehicleModel.findById(id);
    if (!vehicle) throw new AppError("Fordonet hittades inte.", 404);
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newVehicle = await VehicleModel.create(req.body);
    res.status(201).json(newVehicle);
  } catch (err) {
    next(err);
  }
};

export const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await VehicleModel.update(id, req.body);
    if (!updated) throw new AppError("Fordonet hittades inte", 404);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await VehicleModel.remove(Number(req.params.id));
    if (!deleted) throw new AppError("Fordonet hittades inte.", 404);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
