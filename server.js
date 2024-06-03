import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";

dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, { dbName: "Companies" })
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Failed to connect"));

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Task:

// Develop a Node.js Express Application for Managing Company and Company Profiles

// Objective:

// Create a web application using Node.js and Express, integrated with MongoDB as the database. The application should manage a collection of company and their associated profiles, including routes for basic CRUD operations and demonstrating a one-to-one relationship between the Company and CompanyProfile collections.

// Application Logic:

// Ensure proper error handling for routes.
// Implement validation for the data being inserted or updated.
