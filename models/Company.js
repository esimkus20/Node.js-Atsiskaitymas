import mongoose from "mongoose";

// Company should have fields: id, name, industry, location, profileId

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CompanyProfile",
            required: true,
        },
    },
    { versionKey: false }
);

export default mongoose.model("Company", companySchema);
