import express from "express";
import {
    addCompany,
    getCompanies,
    getCompanyById,
    updateCompanyById,
} from "../controllers/companiesController.js";

const router = express.Router();

router.get("/", getCompanies); // Fetch all companies.
router.get("/:id", getCompanyById); // Fetch a single company by ID and it's company profile

router.post("/", addCompany); // Add a new company.

router.put("/:id", updateCompanyById); // Update a company by ID.

export default router;
