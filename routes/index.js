import express from "express";
import companiesRouter from "./companiesRouter.js";
import companyProfilesRouter from "./companyProfilesRouter.js";

const router = express.Router();

router.use("/companies", companiesRouter);
router.use("/companyProfiles", companyProfilesRouter);

export default router;
