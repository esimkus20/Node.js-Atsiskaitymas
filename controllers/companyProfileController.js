import CompanyProfile from "../models/CompanyProfile.js";

// GET all company profiles
export async function getCompanyProfiles(req, res) {
    try {
        const companyProfiles = await CompanyProfile.find();

        res.status(200).json(companyProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// POST a new company profile
export async function addCompanyProfile(req, res) {
    try {
        const { founder, foundedYear, numberOfEmployees } = req.body;

        const newCompanyProfile = new CompanyProfile({
            founder,
            foundedYear,
            numberOfEmployees,
        });

        await newCompanyProfile.save();

        res.status(201).json(newCompanyProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// PUT update a company profile by ID
export async function updateCompanyProfileById(req, res) {
    try {
        const { id } = req.params;

        const { founder, foundedYear, numberOfEmployees } = req.body;

        const companyProfile = await CompanyProfile.findById(id);

        if (!companyProfile) {
            return res
                .status(404)
                .json({ message: "Company Profile not found" });
        }

        if (founder) companyProfile.founder = founder;
        if (foundedYear) companyProfile.foundedYear = foundedYear;
        if (numberOfEmployees)
            companyProfile.numberOfEmployees = numberOfEmployees;

        await companyProfile.save();

        res.status(200).json(companyProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
