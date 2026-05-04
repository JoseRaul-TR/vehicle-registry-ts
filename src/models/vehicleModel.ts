// src/models/vehiclesModel.js
import { query } from "../config/db.ts";
import { ResultSetHeader } from "mysql2";
import type { Vehicle, VehicleInput } from "../types/index.ts";

export const findAll = async (
  filters: Partial<Vehicle>,
  sortField: string,
): Promise<Vehicle[]> => {
  const { make, color, year } = filters;
  const conditions: string[] = [];
  const params: any[] = [];

  if (make) {
    conditions.push("make LIKE ?");
    params.push(`%${make}%`);
  }
  if (color) {
    conditions.push("color LIKE ?");
    params.push(`%${color}%`);
  }
  if (year) {
    conditions.push("year = ?");
    params.push(Number(year));
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  return query<Vehicle[]>(
    `SELECT * FROM vehicles ${where} ORDER BY ${sortField} ASC`,
    params,
  );
};

export const findClassics = (limitYear: number): Promise<Vehicle[]> =>
  query<Vehicle[]>(`SELECT * FROM vehicles WHERE year < ? ORDER BY year ASC`, [
    limitYear,
  ]);

export const findById = async (id: number): Promise<Vehicle | null> => {
  const rows = await query<Vehicle[]>(`SELECT * FROM vehicles WHERE id = ?`, [
    id,
  ]);
  return rows[0] ?? null;
};

export const create = async (data: VehicleInput): Promise<Vehicle | null> => {
  const result = await query<ResultSetHeader>(
    "INSERT INTO vehicles (make, model, year, color) VALUES (?, ?, ?, ?)",
    [data.make, data.model, data.year, data.color ?? ""],
  );
  return findById(result.insertId);
};

export const update = async (
  id: number,
  data: VehicleInput,
): Promise<Vehicle | null> => {
  await query<ResultSetHeader>(
    "UPDATE vehicles SET make =?, model =?, year =?, color =? WHERE id =?",
    [data.make, data.model, data.year, data.color ?? "", id],
  );
  return findById(id);
};

export const remove = async (id: number): Promise<Vehicle | null> => {
  const vehicle = await findById(id);
  if (!vehicle) return null;
  await query<ResultSetHeader>("DELETE FROM vehicles WHERE id = ?", [id]);
  return vehicle;
};
