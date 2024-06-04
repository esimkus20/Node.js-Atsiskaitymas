import Company from "../models/Company.js";
import CompanyProfile from "../models/CompanyProfile.js";

// GET all companies
export async function getCompanies(req, res) {
    try {
        const companies = await Company.find();

        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET a single company by ID
export async function getCompanyById(req, res) {
    try {
        const { id } = req.params;

        const company = await Company.findById(id).populate("profileId");

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST a new company
export async function addCompany(req, res) {
    try {
        const { name, industry, location, profileId } = req.body;

        // Check if the profileId is already associated with an existing company
        const existingCompany = await Company.findOne({ profileId });

        if (existingCompany) {
            return res.status(400).json({
                message: "Profile ID is already assigned to another company",
            });
        }

        // Validate that the profileId exists in the CompanyProfile collection
        const isProfileId = await CompanyProfile.findById(profileId);

        if (!isProfileId) {
            return res
                .status(404)
                .json({ message: "Company profile not found" });
        }

        const newCompany = new Company({
            name,
            industry,
            location,
            profileId,
        });

        await newCompany.save();

        // Update the CompanyProfile with the new company's ID
        isProfileId.companyId = newCompany._id;

        await isProfileId.save();

        res.status(201).json(newCompany);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// PUT update a company by ID
export async function updateCompanyById(req, res) {
    try {
        const { id } = req.params;

        const { name, industry, location, profileId } = req.body;

        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        if (name) company.name = name;
        if (industry) company.industry = industry;
        if (location) company.location = location;
        if (profileId) company.profileId = profileId;

        await company.save();

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
