# 🚗 Vehicle Registry API (TypeScript)

A professional, robust, and minimalist vehicle registry system built with **Node.js**, **Express**, and **MySQL**. This application follows the **MVC (Model-View-Controller)** architecture and is fully typed with **TypeScript** to ensure code quality, maintainability, and a strong developer experience.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v20.x or higher recommended)
- **Language:** TypeScript
- **Framework:** Express.js 5.x
- **Database:** MySQL (`mysql2/promise`)
- **Environment Management:** dotenv
- **Development Engine:** tsx (modern TypeScript execution)

---

## 🏗️ Project Architecture

```
src/
  config/        # Database connection (pool)
  controllers/   # Request/response logic
  middleware/    # Validation & error handling
  models/        # Database queries
  types/         # Shared TypeScript interfaces
  utils/         # Custom utilities (AppError)

app.ts           # Express app configuration
server.ts        # Server entry point
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js installed
- MySQL running (local, Docker, or cloud)
- Git

---

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/vehicle-registry-ts.git
cd vehicle-registry-ts
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Database Setup

Log into MySQL and run:

```sql
CREATE DATABASE IF NOT EXISTS fordonsregister;
USE fordonsregister;

CREATE TABLE IF NOT EXISTS vehicles (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  make       VARCHAR(50)  NOT NULL,
  model      VARCHAR(50)  NOT NULL,
  year       INT          NOT NULL,
  color      VARCHAR(30)  DEFAULT '',
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO vehicles (make, model, year, color) VALUES
  ('Volvo',      'V70',   2015, 'Silver'),
  ('Saab',       '900',   1993, 'Röd'),
  ('Volkswagen', 'Golf',  2019, 'Svart'),
  ('Toyota',     'Prius', 2021, 'Vit'),
  ('Ford',       'Mustang', 1969, 'Gul');
```

---

### 5. Environment Variables

Create a `.env` file in the root:

```
PORT=3000
DB_HOST=localhost
DB_PORT=your_mysql_port
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=fordonregister
```

---

## ⚙️ Scripts

| Script      | Command         | Description                  |
| ----------- | --------------- | ---------------------------- |
| Development | `npm run dev`   | Runs server with `tsx watch` |
| Build       | `npm run build` | Compiles TS → JS in `/dist`  |
| Start       | `npm run start` | Runs compiled app            |

---

## 📡 API Endpoints

### Vehicles

| Method | Endpoint                             | Description                          |
| ------ | ------------------------------------ | ------------------------------------ |
| GET    | `/api/vehicles`                      | Get all vehicles (filters supported) |
| GET    | `/api/vehicles?make=volvo&year=2015` | Filter by query params               |
| GET    | `/api/vehicles?sort=year`            | Sort by `make`, `year`, `color`      |
| GET    | `/api/vehicles/classics`             | Vehicles before 1980                 |
| GET    | `/api/vehicles/:id`                  | Get vehicle by ID                    |
| POST   | `/api/vehicles`                      | Create vehicle                       |
| PUT    | `/api/vehicles/:id`                  | Update vehicle                       |
| DELETE | `/api/vehicles/:id`                  | Delete vehicle                       |

---

## 🧠 Business Rules

- `year` must be:
  - ≥ 1886
  - ≤ current year + 1

- `color` max length: 30 characters
- Duplicate vehicles prevented via:

  ```
  UNIQUE (make, model, year)
  ```

---

## 🛑 Graceful Shutdown

The server supports controlled shutdown via terminal input:

```
exit
quit
bye
ciao
hasta la vista
```

### Why this matters

- Closes MySQL connection pool properly
- Stops accepting new HTTP requests
- Prevents orphan processes

---

## 🧪 Development Notes

- Uses **ESM modules** (`"type": "module"`)
- Imports must include `.js` extension:

```ts
import app from "./app.js";
```

- TypeScript executed via:

```bash
npm run dev
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 👤 Credits

Original exercise in JavaScript by **@niklas-mardby**.
Migrated to TypeScript and extended by **@JoseRaul-TR**, including:

- Creation of `controllers/vehicleController.ts`
- Creation of `app.ts`
- Implementation of graceful server shutdown
