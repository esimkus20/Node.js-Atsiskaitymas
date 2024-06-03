import mongoose from "mongoose";

// CompanyProfile should have fields: id, companyId, founder, foundedYear, numberOfEmployees.

const companyProfileSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        founder: {
            type: String,
            required: true,
        },
        foundedYear: {
            type: Number,
            required: true,
        },
        numberOfEmployees: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false }
);

export default mongoose.model("CompanyProfile", companyProfileSchema);
