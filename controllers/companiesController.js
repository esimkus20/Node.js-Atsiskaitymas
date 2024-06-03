import Company from "../models/Company.js";
import CompanyProfile from "../models/CompanyProfile.js";

// GET all companies
export async function getCompanies(req, res) {
    try {
        const companies = await Company.find().populate("profileId");

        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET a single company by ID
export async function getCompanyById(req, res) {
    try {
        const { id } = req.params;

        // Find the company by ID
        const company = await Company.findById(id).populate("profileId");

        if (company) {
            // Find the company profile by companyId
            const companyProfile = await CompanyProfile.findOne({
                companyId: id,
            });

            // If company profile exists, add its ID to the company object
            if (companyProfile) {
                company.profileId = companyProfile._id;
            }

            // Respond with the company object
            res.status(200).json(company);
        } else {
            res.status(404).json({ message: "Company not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST a new company
export async function addCompany(req, res) {
    try {
        const { name, industry, location, profileId } = req.body;

        const newCompany = new Company({
            name,
            industry,
            location,
            profileId,
        });

        await newCompany.save();

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

        if (name) {
            company.name = name;
        }

        if (industry) {
            company.industry = industry;
        }

        if (location) {
            company.location = location;
        }

        if (profileId) {
            company.profileId = profileId;
        }

        await company.save();

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
