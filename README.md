# Sensor Monitoring Dashboard

This is a full-stack project implementing a dashboard for real-time monitoring of the status and consumption of an IoT sensor system (e.g., smart dispensers in restrooms).

The **frontend** is built with **React** and **TypeScript**, using **Vite** as the bundler. The modern, responsive UI is built with **Tailwind CSS**. Server-side state management and data fetching are efficiently handled by **TanStack Query** (`useQuery`, `useMutation`). Data visualizations are rendered using **Recharts** for bar charts and **react-circular-progressbar** for refill gauges.

The **backend** is a **Node.js** server built with **Express** and **TypeScript**. It connects to a **MongoDB** database for data persistence. It includes a RESTful API, server-side schema validation with **Zod**, and **CORS** handling for secure communication with the frontend.

## ✨ Key Features

* **Sensor Status:** Displays the real-time status (Active/Inactive) of all devices.
* **Refill Report:** Donut charts showing the remaining percentage of consumables (e.g., soap, towels).
* **Historic Consumption:** Stat cards summarizing total consumption.
* **Consumption by Period:** A dynamic reporting panel with bar charts, allowing filtering by day, month, or year.
* **Last Records:** A table displaying the latest events received from the sensors.
