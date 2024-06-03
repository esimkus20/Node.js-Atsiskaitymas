import express from "express";
import {
    addCompanyProfile,
    getCompanyProfiles,
    updateCompanyProfileById,
} from "../controllers/companyProfileController.js";

const router = express.Router();

router.get("/", getCompanyProfiles); // Fetch all company profiles.

router.post("/", addCompanyProfile); // Add a new company profile (linked to a company).

router.put("/:id", updateCompanyProfileById); // Update a company profile by ID.

export default router;
